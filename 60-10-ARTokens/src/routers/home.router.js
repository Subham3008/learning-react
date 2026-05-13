const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");



const router = express.Router()

router.get("/", authMiddleware, async (req, res) => {
  try {

    return res.send("Ok I am in the Home...")

  } catch (err) {
    console.log("Error from backend api", err);
    return res.status(500).json({
      message: "Internal server error."
    })
  }
})


module.exports = router