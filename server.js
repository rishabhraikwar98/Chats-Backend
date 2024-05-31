const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("Socket connection: ", socket.id);
});
