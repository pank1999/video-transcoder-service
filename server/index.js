require("dotenv").config();
const cors = require("cors");
const express = require("express");
const s3Client = require("./config/aws-config");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT;

app.post("/upload", async (req, res) => {
  const uploadedFile = req.body;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `uploads/temp-videos/${uploadedFile.filename}`,
    ContentType: uploadedFile.mimetype,
  });
  const preSignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 200,
  });
  res.json({ message: "uploaded successful", preSignedUrl });
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
