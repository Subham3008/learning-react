import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema({
  jobId:     { type: String, required: true, unique: true },
  url:       { type: String, required: true },
  title:     { type: String, default: '' },
  format:    { type: String, default: '' },
  status:    { type: String, enum: ['started', 'completed', 'failed'], default: 'started' },
  createdAt: { type: Date, default: Date.now, expires: 86400 }, // auto-delete after 24h
});

export default mongoose.model('Download', downloadSchema);
