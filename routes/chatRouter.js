const express = require('express');
const {getAllChats,getMessages} = require("../controller/chatsController")
const router = express.Router()
router.route("/").get(getAllChats)
router.route("/messages/:chatId").get(getMessages)

module.exports = router