const FriendRequest = require("../model/friendRequestSchema");
const User = require("../model/userSchema");
const getMyProfile = async (req, res) => {
  try {
    const myProfile = await User.findById(req.user._id).select(
      "name email about avatar"
    );
    return res.status(200).json(myProfile);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
const updateMyProfile = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    await User.findByIdAndUpdate(req.user._id, {
      name,
      about,
      avatar,
    });
    res.status(200).json({ message: "Profile updated!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const searchProfile = async (req, res) => {
  const { query } = req.query;
  try {
    if (!query.trim()) {
      return res.status(400).json({ message: "Empty query!" });
    }
    const searchCriteria = {
      _id: { $ne: req.user._id },
      $or: [
        { name: { $regex: query, $options: "i" } },
      ],
    };
    let results = await User.find(searchCriteria).select(
      "name email about avatar"
    );
    const myProfile = await User.findById(req.user._id).select("friends");
    results = results.map((profile) => {
      const isFriend = myProfile.friends.includes(profile._id);
      return {
        ...profile.toObject(),
        isFriend,
      };
    });
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
const viewProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await User.findById(userId).select(
      "name email about avatar"
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile Not Found!" });
    }
    const myProfile = await User.findById(req.user._id).select("friends");
    const pendingRequest = await FriendRequest.findOne({
      sender: req.user._id,
      reciever: userId,
    });
    let finalResponse = {
      ...profile.toObject(),
    };
    if (myProfile.friends.includes(userId)) {
      finalResponse.isFriend = true;
      return res.status(200).json(finalResponse);
    }
    if (pendingRequest) {
      finalResponse.sentRequest = true;
    } else {
      finalResponse.sentRequest = false;
    }
    return res.status(200).json(finalResponse);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
module.exports = { getMyProfile, updateMyProfile, searchProfile, viewProfile };
