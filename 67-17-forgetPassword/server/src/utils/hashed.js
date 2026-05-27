const bcrypt = require("bcrypt")
const crypto = require("crypto")

let hashedValue = async (value) => {
  return await bcrypt.hash(value, 10)
}

let comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword)
}

const cryptoHashFunction = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};


module.exports = {
  hashedValue,
  comparePassword,
  cryptoHashFunction,
}