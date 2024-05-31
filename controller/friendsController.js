const FriendRequest = require("../model/friendRequestSchema");
const User = require("../model/userSchema");
const Chat = require("../model/chatSchema");
const getMyFriends = async (req, res) => {
  try {
    const myProfile = await User.findById(req.user._id).populate({
      path: "friends",
      select: ["name", "email", "avatar"],
    });
    return res.status(200).json(myProfile.friends);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
const removeFriend = async (req, res) => {
  const {userId} = req.params
  try {
    const myProfile = await User.findByIdAndUpdate(req.user._id, {
      $pull: { friends: userId},
    });
    const friendProfile = await User.findByIdAndUpdate(userId, {
      $pull: { friends: req.user._id },
    });
    const chat = await Chat.findOneAndDelete({
      members: { $all: [req.user._id, userId] },
    });
    if (myProfile && friendProfile && chat) {
      return res.status(200).json({ message: "Friend Removed!" });
    }
    return res.status(400).json({ message: "Bad Request!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
const sendFriendRequest = async (req, res) => {
  const {userId} = req.params
  const recieverProfile = await User.findById(userId);
  const myProfile = await User.findById(req.user._id);
  try {
    const existingRequest = await FriendRequest.findOne({
      sender: myProfile._id,
      reciever: recieverProfile._id,
    });
    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent!" });
    }
    if (
      recieverProfile.friends.includes(myProfile._id) ||
      myProfile.friends.includes(recieverProfile._id)
    ) {
      return res.status(400).json({ message: "Bad Request!" });
    }
    const newFriendRequest = new FriendRequest({
      sender: myProfile._id,
      reciever: recieverProfile._id,
    });
    await newFriendRequest.save();
    return res.status(201).json({ message: "Request Sent!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
const acceptFriendRequest = async (req, res) => {
  const {reqId} = req.params
  try {
    const existingRequest = await FriendRequest.findById(reqId);
    if (!existingRequest) {
      return res.status(404).send({ message: "Friend request not found!" });
    }
    const senderProfile = await User.findOne(existingRequest.sender);
    const recieverProfile = await User.findOne(existingRequest.reciever);
    senderProfile.friends.push(recieverProfile._id);
    recieverProfile.friends.push(senderProfile._id);
    await recieverProfile.save();
    await senderProfile.save();
    const newChat = new Chat({
      members: [senderProfile._id, recieverProfile._id],
    });
    await newChat.save();
    await FriendRequest.findByIdAndDelete(reqId);
    return res.status(200).json({ message: "Added friend!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
const deleteFriendRequest = async (req, res) => {
  const {reqId} = req.params;
  try {
    const existingRequest = await FriendRequest.findById(reqId);
    if (!existingRequest) {
      return res.status(404).send({ message: "Friend request not found!" });
    }
    await FriendRequest.findByIdAndDelete(existingRequest._id);
    return res.status(200).send({ message: "Deleted friend request!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
const getFriendRequests = async (req, res) => {
  try {
    const allRequests = await FriendRequest.find({
      reciever: req.user._id,
    })
      .select("-reciever -__v -createdAt -updatedAt")
      .populate({
        path: "sender",
        select: ["name", "email", "avatar"],
      }).sort({"createdAt":-1})
    return res.status(200).json(allRequests);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  getMyFriends,
  removeFriend,
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
  getFriendRequests,
};
