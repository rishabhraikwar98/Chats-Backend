const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./database/connect");
const bodyParser = require("body-parser")
const rootRouter = require("./routes/index")
const app = express();
app.use(cors({
  //origin:process.env.BASE_URL,
  origin: "*"
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1",rootRouter)
//testing
app.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = app;
