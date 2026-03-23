const express = require("express");
const router = express.Router();

const { fetchInfo } = require("../controllers/videoController");

router.get("/info", fetchInfo);

module.exports = router;
