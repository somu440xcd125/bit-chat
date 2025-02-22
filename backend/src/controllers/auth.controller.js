import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utill/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Password validation
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        // Save user to DB
        await newUser.save();

        // Generate token
        generateToken(newUser._id, res);

        // Send success response
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic || null, // Handle missing profilePic
        });
    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login=async(req,res)=>{
    const {email,password}=req.body
   try {
    const user=await User.findOne({email})
    if(!user) {
        return res.status(400).json({ message: "invalid credentials" });
    } 
   const isPasswordCorrect= await bcrypt.compare(password,user.password)
   if(!isPasswordCorrect){
    return res.status(400).json({ message: "invalid credentials" });
   }
   generateToken(user._id,res)
   res.status(200).json({
    _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic || null,
   })
    
   } catch (error) {
    console.error("Error in login controller:", error.message);

    res.status(500).json({ message: "Internal server error" });
   }
}
export const logout=(req,res)=>{
   try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"loged out successfully"})
   } catch (error) {
    console.error("Error in logOut  controller:", error.message);

    res.status(500).json({ message: "Internal server error" });
   }
}


export const updateProfile=async (req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId=req.user._id;
        if(!profilePic){
            return res.status(400).json({message:"profile pic is require"})
            
        }
        const uplodResponse=await cloudinary.uploader.upload(profilePic)
        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uplodResponse.secure_url},{new:true})
        res.status(200).json(updatedUser)
        
    } catch (error) {
        console.error("Error in update user:", error.message);

        res.status(500).json({ message: "Internal server error" });
        
    }

}


export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user)
        
    } catch (error) {
        console.error("Error in checkAuth  controller:", error.message);

        res.status(500).json({ message: "Internal server error" });
    }

}