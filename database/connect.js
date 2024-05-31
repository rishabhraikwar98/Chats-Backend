const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGO_URI;
const connect = () => {
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));
};

connect();
