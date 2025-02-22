import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User model
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      
    },
    image:{
        type:String,
    }
   
  },
  { timestamps: true } // Adds createdAt & updatedAt fields
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
