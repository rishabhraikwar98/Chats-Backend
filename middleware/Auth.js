const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const idFromToken = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const id = jwt.verify(token, process.env.jwt_secret).data;
  return id;
};
const authMiddleware = async (req, res, next) => {
  try {
    const userId = idFromToken(req);
    const user = await User.findById(userId).lean();
    if (user) {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized!",
    });
  }
};
module.exports = authMiddleware;
