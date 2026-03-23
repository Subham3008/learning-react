const { getVideoInfo } = require("../services/youtubeService");

// ✅ fetchInfo function define karo
const fetchInfo = async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const data = await getVideoInfo(url);
    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch video" });
  }
};

// ✅ optional (agar use nahi kar raha to hata bhi sakta hai)
const downloadVideo = (req, res) => {
  res.send("Download handled on frontend");
};

// ✅ export
module.exports = { fetchInfo, downloadVideo };
