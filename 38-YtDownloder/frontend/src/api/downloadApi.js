import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

/**
 * Fetch video metadata for a given URL
 */
export async function fetchVideoInfo(url) {
  const { data } = await api.post('/info', { url });
  return data;
}

/**
 * Fetch download history
 */
export async function fetchHistory() {
  const { data } = await api.get('/history');
  return data;
}
