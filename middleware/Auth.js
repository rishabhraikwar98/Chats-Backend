const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const idFromToken = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const id = jwt.verify(token, process.env.JWT_SECRET).data;
  return id;
};
const authMiddleware = async (req, res, next) => {
  try {
    const userId = idFromToken(req);
    const user = await User.findById(userId).lean();
    if (user) {
      req.user = user;
      next();
    }else{
      return res.status(401).json({message:"Unauthorized to access!"});
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};
module.exports = authMiddleware;
