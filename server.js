require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//import routes
const authRoute = require("./routes/auth");

const app = express();

app.use(express.json());

app.use(express.urlencoded());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/api", (req, res) => {
  res.send("Memories hompage is going live for the first time");
});

app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
