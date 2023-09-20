require("dotenv").config();
const { S3Client } = require("@aws-sdk/client-s3");

const config = {
  region: process.env.AWS_REGION,
  credential: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
const client = new S3Client(config);

module.exports = client;
