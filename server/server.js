const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//routes files
const authRoutes = require("./routes/authRoutes.js");

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

//orutes initialize
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    app.listen(PORT, () =>
      console.log(
        "mongoose connected successfully and running on PORT : " + PORT
      )
    );
  })
  .catch((err) => console.log(err, " errr"));
