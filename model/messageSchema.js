const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    to:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);
const Message = new mongoose.model("Message", MessageSchema);
module.exports = Message
