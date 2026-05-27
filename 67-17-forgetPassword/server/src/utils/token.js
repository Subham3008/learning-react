const jwt = require("jsonwebtoken")
const crypto = require("crypto")

let generateAccessToken = async (userId) => {
  return await jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" })
}

let generateRefreshToken = async (userId) => {
  return await jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" })
}

let generatePasswordResetToken = () => {
  //toString("hex")---> means readable string
  //hex --> hexadecimal
  let rawResetToken = crypto.randomBytes(32).toString("hex");
  //console.log("Password reset Token->" , rawResetToken);
  return rawResetToken;

}

const getResetTokenExpiry = () => {
  return Date.now() + 10 * 60 * 1000;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generatePasswordResetToken,
  getResetTokenExpiry,
}