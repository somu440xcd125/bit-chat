import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js"
import {  getReciverSocketId, io } from "../lib/socet.js";


export const getUsersForSideBar=async(req,res)=>{
    try {
        const loggedInUser=req.user._id;
        const filterUser= await User.find({_id:{$ne:loggedInUser}}).select("-password");
        res.status(200).json(filterUser)
    } catch (error) {
        console.error("Error in getUserForSidebar  controller:", error.message);

        res.status(500).json({ message: "Internal server error" });
    }

}

export const getMessage = async (req, res) => {
    try {
        const { id:userToChatId } = req.params; // Receiver's user ID
        const senderId = req.user._id; // Authenticated user (sender)

        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: senderId },
            ],
        })
        // .sort({ createdAt: 1 }) // Sort by oldest first
        // .populate("sender", "fullName email") // Populate sender details
        // .populate("receiver", "fullName email");
        
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const sendMessage=async(req,res)=>{
    try {

        const {text,image} =req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,

        });
        await newMessage.save();
        const reciverSocketId=getReciverSocketId(receiverId);
        if(getReciverSocketId){
            io.to(reciverSocketId).emit("newMessage",newMessage)                                                                      
        }


        res.status(201).json(newMessage)
        
    } catch (error) {
        console.error("Error send messages:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

}