const mongoose = require("mongoose")
require("dotenv").config()


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDb Connected");
  } catch (error) {
    console.log("Error in connecting MongoDB", error);
  }
}

module.exports = connectDB