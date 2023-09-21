const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { SpheronClient, ipfs } = require("@spheron/storage");

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8111;

app.use(cors());

app.post("/pin-cid", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const name = "ipfs-migrator";
    const { cid } = req.body;
    const v1 = ipfs.utils.toV1(cid);

    const client = new SpheronClient({
      token,
    });

    console.log("Pinning...");

    const pinRes = await client.pinCID({
      name,
      cid: v1,
      inBackground: true,
    });

    res.status(200).json({
      pinRes,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
