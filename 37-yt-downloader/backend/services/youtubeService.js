const youtubedl = require("yt-dlp-exec");

const getVideoInfo = async (url) => {
  const info = await youtubedl(url, {
    dumpSingleJson: true,
    noWarnings: true,
    preferFreeFormats: true,

    // 🔥 MAGIC LINE
    cookiesFromBrowser: "chrome"
  });

  return {
    title: info.title,
    thumbnail: info.thumbnail,
    qualities: info.formats
      .filter(f => f.ext === "mp4" && f.format_note)
      .map(f => ({
        quality: f.format_note,
        url: f.url
      }))
  };
};

module.exports = { getVideoInfo };
