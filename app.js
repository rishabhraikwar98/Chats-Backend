const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./database/connect");
const rootRouter = require("./routes/index")
const app = express();
const corsConfig = {
  origin: process.env.BASE_URL,
  credentials: true,
};
app.use(cors(corsConfig));
app.use(express.json());
app.use("/api/v1",rootRouter)
//testing
app.get("/", (req, res) => {
  res.send("Hello");
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on ${port}`));
module.exports = app;
