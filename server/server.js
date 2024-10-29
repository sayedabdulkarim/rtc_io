const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { log } = require("console");

require("dotenv").config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    app.listen(() =>
      console.log(
        "mongoose connected successfully and running on PORT : " + PORT
      )
    );
  })
  .catch((err) => console.log(err, " errr"));
