const { config } = require('dotenv')
const mongoose = require('mongoose')
require('dotenv').config()

function connectTODb() {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connect to DB');

    })
}

module.exports = connectTODb