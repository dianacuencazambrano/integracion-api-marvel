const dotenv = require('dotenv');
dotenv.config();

const getMarvelAuthParams = () => {
  const publicKey = process.env.PUBLICKEY;
  const privateKey = process.env.PRIVATEKEY;
  const timestamp = new Date().getTime();
  const hash = require("crypto")
    .createHash("md5")
    .update(timestamp + privateKey + publicKey)
    .digest("hex");

  return {
    ts: timestamp,
    apikey: publicKey,
    hash: hash,
  };
};

const getMarvelApiUrl = (path) => {
  return `https://gateway.marvel.com/v1/public/${path}`;
};

module.exports = {
  getMarvelAuthParams,
  getMarvelApiUrl,
};
