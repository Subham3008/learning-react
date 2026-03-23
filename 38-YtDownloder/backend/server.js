import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './src/config/db.js';
import downloadRoutes from './src/routes/downloadRoutes.js';
import fs from 'fs';

// Ensure temp download dir exists
const tmpDir = process.env.TMP_DIR || '/tmp/yt-downloads';
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

const app = express();

connectDB();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  exposedHeaders: ['X-Job-Id', 'Content-Disposition'],
}));
app.use(express.json());

app.use('/api', downloadRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
