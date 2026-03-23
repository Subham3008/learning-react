import { spawn } from 'child_process';
import path from 'path';

const YTDLP_BIN = process.env.YTDLP_PATH || 'yt-dlp';
const TMP_DIR   = process.env.TMP_DIR    || '/tmp/yt-downloads';

// Safe format IDs we allow (never trust raw client values)
const ALLOWED_FORMATS = new Set([
  'bestvideo[height<=360]+bestaudio/best[height<=360]',
  'bestvideo[height<=720]+bestaudio/best[height<=720]',
  'bestvideo[height<=1080]+bestaudio/best[height<=1080]',
  'bestaudio/best',
]);

/**
 * Fetch video metadata using yt-dlp --dump-json
 */
export function getVideoInfo(url) {
  return new Promise((resolve, reject) => {
    const proc = spawn(YTDLP_BIN, [
      '--dump-json',
      '--no-playlist',
      '--no-warnings',
      url,
    ]);

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', d => (stdout += d.toString()));
    proc.stderr.on('data', d => (stderr += d.toString()));

    // Kill after 30 seconds if hung
    const timeout = setTimeout(() => {
      proc.kill();
      reject(new Error('Timed out fetching video info'));
    }, 30000);

    proc.on('close', code => {
      clearTimeout(timeout);
      if (code !== 0) {
        return reject(new Error(parseYtDlpError(stderr)));
      }
      try {
        const info = JSON.parse(stdout);
        resolve({
          title:     info.title,
          thumbnail: info.thumbnail,
          duration:  info.duration_string || 'Unknown',
          uploader:  info.uploader || '',
          formats:   buildFormatList(info),
        });
      } catch {
        reject(new Error('Failed to parse video metadata'));
      }
    });
  });
}

/**
 * Stream video download to an Express response object.
 * Returns the child process so the caller can kill it on cancel.
 */
export function streamVideoDownload(url, formatId, onProgress, onError) {
  if (!ALLOWED_FORMATS.has(formatId)) {
    throw new Error('Invalid format requested');
  }

  const args = [
    '--no-playlist',
    '--no-warnings',
    '-f', formatId,
    '--merge-output-format', 'mp4',
    '--newline',
    '-o', '-',  // output to stdout so we can pipe it
    url,
  ];

  const proc = spawn(YTDLP_BIN, args);

  // Parse progress % from stderr lines like "[download]  42.3% of ..."
  proc.stderr.on('data', chunk => {
    const line  = chunk.toString();
    const match = line.match(/(\d+\.?\d*)%/);
    if (match) onProgress(parseFloat(match[1]));
  });

  proc.on('error', err => onError(new Error(`yt-dlp process error: ${err.message}`)));

  return proc;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildFormatList(info) {
  const formats = info.formats || [];

  const qualities = [
    { label: '360p',        id: 'bestvideo[height<=360]+bestaudio/best[height<=360]'   },
    { label: '720p (HD)',   id: 'bestvideo[height<=720]+bestaudio/best[height<=720]'   },
    { label: '1080p (FHD)', id: 'bestvideo[height<=1080]+bestaudio/best[height<=1080]' },
    { label: 'Audio only',  id: 'bestaudio/best'                                        },
  ];

  // Only include video qualities actually available for this video
  const maxHeight = Math.max(...formats.map(f => f.height || 0));
  return qualities.filter(q => {
    if (q.id === 'bestaudio/best') return true;
    const height = parseInt(q.label);
    return maxHeight >= height;
  });
}

function parseYtDlpError(stderr) {
  if (stderr.includes('Sign in to confirm'))   return 'YouTube is blocking this request. Try again later or use cookies.';
  if (stderr.includes('Video unavailable'))    return 'This video is unavailable or private.';
  if (stderr.includes('Private video'))        return 'This video is private.';
  if (stderr.includes('HTTP Error 429'))       return 'Rate limited by YouTube. Please wait a few minutes.';
  if (stderr.includes('is not a valid URL'))   return 'Invalid YouTube URL.';
  return 'Failed to fetch video. The video may be restricted or unavailable.';
}
