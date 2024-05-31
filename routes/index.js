const express = require('express')
//middlewares
const uploadMiddleware = require("../middleware/Upload")
const authMiddleware = require("../middleware/Auth")
//routes
const authRouter = require("./authRouter");
const profileRouter = require("./profileRouter");
const friendsRouter= require("./friendsRouter")
const chatRouter = require("./chatRouter")
const imageRouter = require("./imageRouter")
const router = express.Router()

router.use("/auth", authRouter);
router.use("/profile",authMiddleware,profileRouter)
router.use("/friends",authMiddleware,friendsRouter)
router.use("/chat",authMiddleware,chatRouter)
router.use("/upload",uploadMiddleware,authMiddleware,imageRouter)
module.exports = router
