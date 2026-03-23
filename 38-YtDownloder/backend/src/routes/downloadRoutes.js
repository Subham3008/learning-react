import { Router } from 'express';
import { validateYouTubeUrl } from '../middleware/validateUrl.js';
import { infoLimiter, downloadLimiter } from '../middleware/rateLimiter.js';
import {
  fetchInfo,
  startDownload,
  streamProgress,
  getHistory,
} from '../controllers/downloadController.js';

const router = Router();

router.post('/info',              infoLimiter,     validateYouTubeUrl, fetchInfo);
router.get('/download',           downloadLimiter, validateYouTubeUrl, startDownload);
router.get('/progress/:jobId',                                         streamProgress);
router.get('/history',                                                 getHistory);

export default router;
