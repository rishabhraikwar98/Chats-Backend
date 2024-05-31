const mongoose = require("mongoose");

const FriendRequestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reciever: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},{timestamps:true});

const FriendRequest = new mongoose.model("Friend_Request", FriendRequestSchema);
module.exports = FriendRequest;
