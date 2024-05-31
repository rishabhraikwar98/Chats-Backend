const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minLength: 3,
    maxLength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  avatar: {
    type: String,
    default: "",
  },
  friends: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  about: {
    type: String,
    maxLength: 300,
    default: "",
  },
},{timestamps: true});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const User = new mongoose.model("User", userSchema);
module.exports = User;
