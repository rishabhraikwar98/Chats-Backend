const express = require("express");
const {
  getMyProfile,
  updateMyProfile,
  searchProfile,
  viewProfile
} = require("../controller/profileController");
const router = express.Router();

router.route("/my_profile").get(getMyProfile).patch(updateMyProfile);
router.route("/search").get(searchProfile)
router.route("/:userId").get(viewProfile)

module.exports = router;
