const app = require("./app");
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const User = require("./model/userSchema");
// const Message = require("./model/messageSchema");
// const Chat = require("./model/chatSchema");
// const io = new Server(server, {
//   cors: {
//     origin:"http://localhost:3000",
//     allowedHeaders: ["Authorization"],
//     credentials: true
//   },
// });
// const userSockets = {};
// //to store user Id and socket
// io.on("connection", async (socket) => {
//   const { userId } = socket.handshake.query;
//   const socketId = socket.id;
//   if (userId) {
//     try {
//       await User.findByIdAndUpdate(userId, { online: true });
//       userSockets[userId] = socketId;
//     } catch (error) {
//       //console.error(error.message);
//     }
//   }
//   //console.log(userSockets)
//   socket.on("text-message", async (data) => {
//     const { chat, from, to, content } = data;
//     const newMessage = new Message({ chat, from, to, content });
//     await newMessage.save();
//     const existingChat = await Chat.findById(chat);
//     existingChat.messages.push(newMessage._id);
//     existingChat.lastMessage = newMessage._id;
//     await existingChat.save();

//     const response = await Message.findById(newMessage._id).select(
//       "-updatedAt -__v"
//     );
//     if (userSockets[from]) {
//       io.to(userSockets[from]).emit("new-message", response);
//     }
//     if (userSockets[to]) {
//       io.to(userSockets[to]).emit("new-message", response);
//     }
//   });
//   socket.on("friend-request", async (data) => {
//     const { to, from } = data;
//     const user = await User.findById(from).select("name");
//     if (userSockets[to]) {
//       io.to(userSockets[to]).emit("new-friend-request", {
//         message: `${user.name} sent you a friend request!`,
//       });
//     }
//   });
//   socket.on("typing", (data) => {
//     const { to } = data;
//     if (userSockets[to]) {
//       io.to(userSockets[to]).emit("user-typing", data);
//     }
//   });
//   socket.on("stopped-typing", (data) => {
//     const { to } = data;
//     if (userSockets[to]) {
//       io.to(userSockets[to]).emit("user-typing-stopped", data);
//     }
//   });
//   socket.on("end", async () => {
//     //console.log("Closing socket");
//     socket.disconnect(0);
//   });

//   socket.on("disconnect", async () => {
//     if (userId) {
//       try {
//         delete userSockets[userId];
//         await User.findByIdAndUpdate(userId, { online: false });
//         //console.log(userSockets)
//       } catch (error) {}
//     }
//   });
// });
const port = process.env.PORT || 5000;
// server.listen(port, () => console.log(`Server listening on ${port}`));
app.listen(port, () => console.log(`Server listening on ${port}`))
