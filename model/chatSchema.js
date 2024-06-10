const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      required: true,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    messages: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
      defalult: [],
    },
  },
  { timestamps: true }
);

const Chat = new mongoose.model("Chat", ChatSchema);
module.exports = Chat;
