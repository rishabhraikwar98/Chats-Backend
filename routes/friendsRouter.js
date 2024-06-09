const express = require("express");
const {
  sendFriendRequest,
  acceptFriendRequest,
  getMyFriends,
  getFriendRequests,
  deleteFriendRequest,
  removeFriend,
  cancelFriendRequest
} = require("../controller/friendsController");
const router = express.Router();
router.route("/new_request/:userId").post(sendFriendRequest);
router.route("/cancel_request/:userId").post(cancelFriendRequest);
router
  .route("/request/:reqId")
  .post(acceptFriendRequest)
  .delete(deleteFriendRequest);
router.route("/").get(getMyFriends);
router.route("/requests").get(getFriendRequests);
router.route("/remove/:userId").patch(removeFriend);
module.exports = router;
