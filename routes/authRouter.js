const express = require("express");
const { userLogin, userRegister } = require("../controller/authController");
const {
  loginSchema,
  registerSchema,
} = require("../validation/auth-validatiors");
const ValidateMiddleware = require("../middleware/Validate");
const router = express.Router();
router.post("/login", ValidateMiddleware(loginSchema), userLogin);
router.post("/register", ValidateMiddleware(registerSchema), userRegister);

module.exports = router;
