require("dotenv").config();
const cors = require("cors");
const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT;

app.post("/upload", upload.array("file"), (req, res) => {
  res.json({ message: "uploaded successful" });
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
