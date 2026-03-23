/**
 * Validates that the request contains a proper YouTube URL.
 * Accepts both body and query params.
 */
export function validateYouTubeUrl(req, res, next) {
  const url = req.body?.url || req.query?.url;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Allow standard watch URLs and short youtu.be links
  const pattern = /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=[\w-]{11}|youtu\.be\/[\w-]{11})/;

  if (!pattern.test(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL. Please paste a valid YouTube video link.' });
  }

  next();
}
