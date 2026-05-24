const bcrypt = require("bcrypt")

let hashedPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

let comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword)
}

module.exports = {
  hashedPassword,
  comparePassword,
}