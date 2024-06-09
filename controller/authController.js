const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    const token = jwt.sign({ data: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "90d",
    });

    return res.status(201).json({
      message: "Signup successfull !",
      access_token: token,
      uid:newUser._id
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already in use!" });
    }
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Could not find user!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ data: user._id }, process.env.JWT_SECRET, {
        expiresIn: "90d",
      });
      res
        .status(200)
        .json({ message: "Login successfull!", access_token: token,uid: user._id });
    } else {
      return res.status(400).json({ message: "Incorrect password!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = { userRegister, userLogin };
