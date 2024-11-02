const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const socketServer = require("./socketServer");

//routes files
const authRoutes = require("./routes/authRoutes.js");

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
//
// Increase the limit for parsed data (JSON)
app.use(express.json({ limit: "50mb" })); // Adjust '50mb' as needed
// Increase the limit for parsed data (URL-encoded)
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Adjust '50mb' as needed

const corsOptions = {
  origin: ["http://localhost:3000"], // Client's URL, not the server's
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));

//orutes initialize
app.use("/api/auth", authRoutes);

//db connect
const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    server.listen(PORT, () =>
      console.log(
        "mongoose connected successfully and running on PORT : " + PORT
      )
    );
  })
  .catch((err) => console.log(err, " errr"));
