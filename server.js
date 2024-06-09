const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const User = require("./model/userSchema");
const Message = require("./model/messageSchema");
const Chat = require("./model/chatSchema");
const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL,
  },
});
io.on("connection", async (socket) => {
  const { userId } = socket.handshake.query;
  const socketId = socket.id;
  console.log("Socket connection: ", socketId, userId);
  if (userId) {
    try {
      await User.findByIdAndUpdate(userId, { socketId: socketId,online:true });
    } catch (error) {
      console.error(error.message);
    }
  }

  socket.on("text-message", async (data) => {
    const { chat, from, to, content } = data;
    const toUser = await User.findById(to);
    const fromUser = await User.findById(from);
    const newMessage = new Message({ chat, from, to, content });
    await newMessage.save();
    const existingChat = await Chat.findById(chat);
    existingChat.messages.push(newMessage._id);
    await existingChat.save();

    const response = await Message.findById(newMessage._id).select(
      "-updatedAt -__v"
    );
    if (toUser.socketId) {
      io.to(toUser.socketId).emit("new-message", response);
    }
    if (fromUser.socketId) {
      io.to(fromUser.socketId).emit("new-message", response);
    }
  });
  // socket.on("typing",(data)=>{
  //   const {fromUser,chatId} = data
  //   io.emit("typing-started",fromUser,chatId);
  // })
  // socket.on("end-typing",(data)=>{
  //   const {fromUser,chatId} = data
  //   io.emit("typing-stopped",fromUser,chatId)
  // })
  socket.on("end", async () => {
    console.log("Closing socket");
    socket.disconnect(0);
  });

  socket.on("disconnect", async () => {
    console.log("Socket disconnected: ", socketId);
    if (userId) {
      try {
        await User.findByIdAndUpdate(userId, { socketId: null,online:false });
      } catch (error) {}
    }
  });
});
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server listening on ${port}`));
