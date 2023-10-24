const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { SpheronClient, ipfs } = require("@spheron/storage");
const { Web3Storage } = require("web3.storage");

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8111;

app.use(cors());

app.post("/pin-cid", async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const { name, provider, token } = req.body;
    const client = new SpheronClient({
      token: accessToken,
    });
    const web3storageClient = new Web3Storage({ token });

    console.log("Pinning...");

    const cids = [];
    for await (const upload of web3storageClient.list()) {
      console.log(
        `${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`
      );
      cids.push(upload.cid);
    }

    const pinRes = await client.pinCIDs({
      name,
      cids,
    });

    res.status(200).json({
      pinRes,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post("/get-upload", async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const { uploadId } = req.body;

    const client = new SpheronClient({
      token: accessToken,
    });

    console.log("Fetching upload status...");

    const uploadStatus = await client.getUpload(uploadId);

    res.status(200).json({
      uploadStatus,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post("/get-bucket-uploads", async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const { bucketId } = req.body;

    const client = new SpheronClient({
      token: accessToken,
    });

    console.log("Fetching upload status...");

    const bucketUploads = await client.getBucketUploads(bucketId, {
      skip: 0,
      limit: 1000,
    });

    res.status(200).json({
      bucketUploads,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
