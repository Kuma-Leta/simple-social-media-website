import mongoose, { model, Schema } from "mongoose";
const chatSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  roomId: { type: String, required: true },
  timeStamps: { type: Date, default: Date.now },
});
const chatModel = model("chat", chatSchema);
export default chatModel;
