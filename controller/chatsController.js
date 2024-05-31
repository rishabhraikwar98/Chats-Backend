const Chat = require("../model/chatSchema");
const Message = require("../model/messageSchema");
const getAllChats = async (req, res) => {
  try {
    let chats = await Chat.find({ members: req.user._id })
      .populate("members", "name email avatar")
      .sort({ "messages.createdAt": -1 })
      .select("-__v -messages");
    chats = chats.map((chat) => {
      chat = chat.toObject();
      chat.members = chat.members.filter(
        (member) => !member._id.equals(req.user._id)
      );
      chat.chatDetail = chat.members[0];
      delete chat.members;
      return chat;
    });
    res.status(200).json(chats);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
const getMessages = async (rew, res) => {
  try {
    const messages = await Message.find();
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
module.exports = { getAllChats, getMessages };
