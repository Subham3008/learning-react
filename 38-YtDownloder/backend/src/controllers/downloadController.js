import { getVideoInfo, streamVideoDownload } from '../services/ytDlpService.js';
import Download from '../models/Download.js';
import { v4 as uuid } from 'uuid';

// In-memory map: jobId -> progress percentage
const progressMap = new Map();

/**
 * POST /api/info
 * Returns video metadata (title, thumbnail, available formats)
 */
export async function fetchInfo(req, res) {
  try {
    const info = await getVideoInfo(req.body.url);
    res.json(info);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
}

/**
 * GET /api/download?url=...&format=...&title=...
 * Streams the video directly to the browser
 */
export async function startDownload(req, res) {
  const { url, format, title = 'video' } = req.query;
  const jobId = uuid();

  const safeTitle = title.replace(/[^\w\s-]/g, '').trim().slice(0, 100) || 'video';

  res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(safeTitle)}.mp4"`);
  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('X-Job-Id', jobId);
  res.setHeader('Access-Control-Expose-Headers', 'X-Job-Id');

  progressMap.set(jobId, 0);

  try {
    await Download.create({ jobId, url, title: safeTitle, format, status: 'started' });
  } catch {
    // Non-fatal — don't block download if DB write fails
  }

  let proc;

  try {
    proc = streamVideoDownload(
      url,
      format,
      pct => progressMap.set(jobId, pct),
      err  => {
        console.error('Download error:', err.message);
        if (!res.headersSent) res.status(500).json({ error: err.message });
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  // Pipe yt-dlp stdout directly to HTTP response
  proc.stdout.pipe(res);

  proc.on('close', async code => {
    const status = code === 0 ? 'completed' : 'failed';
    progressMap.set(jobId, code === 0 ? 100 : -1);

    try {
      await Download.findOneAndUpdate({ jobId }, { status });
    } catch {
      // Ignore DB errors on close
    }

    // Clean up after 5 minutes
    setTimeout(() => progressMap.delete(jobId), 5 * 60 * 1000);
  });

  // Kill the process if client disconnects
  req.on('close', () => {
    if (proc && !proc.killed) proc.kill('SIGTERM');
  });
}

/**
 * GET /api/progress/:jobId
 * Server-Sent Events stream for real-time progress
 */
export function streamProgress(req, res) {
  const { jobId } = req.params;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  const send = pct => res.write(`data: ${JSON.stringify({ progress: pct })}\n\n`);

  // Send initial state immediately
  send(progressMap.get(jobId) ?? 0);

  const interval = setInterval(() => {
    const pct = progressMap.get(jobId);

    if (pct === undefined) {
      send(0);
      return;
    }

    send(pct);

    if (pct >= 100 || pct === -1) {
      clearInterval(interval);
      res.end();
    }
  }, 500);

  req.on('close', () => clearInterval(interval));
}

/**
 * GET /api/history
 * Returns the last 20 downloads
 */
export async function getHistory(req, res) {
  try {
    const history = await Download.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .select('jobId title url format status createdAt');
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
}
