const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const url = "mongodb://localhost/AidarDB";
const app = express();

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
con.on("open", () => {
  console.log("connected...");
});
app.use(cors({
  origin: 'http://localhost:3000' // Your frontend's origin URL
}));
app.use(express.json());

const userRouter = require("./routes/users");
app.use("/users", userRouter);

const surveyRouter = require("./routes/surveys");
app.use("/surveys", surveyRouter);

app.listen(9000, () => {
  console.log("Server Started");
});
