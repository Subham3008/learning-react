import React, { useState } from 'react';
import { fetchVideoInfo } from '../api/downloadApi.js';
import { useSSE } from '../hooks/useSSE.js';
import UrlInput from '../components/UrlInput.jsx';
import QualitySelector from '../components/QualitySelector.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import VideoInfo from '../components/VideoInfo.jsx';
import DownloadHistory from '../components/DownloadHistory.jsx';

export default function Home() {
  const [url, setUrl]             = useState('');
  const [info, setInfo]           = useState(null);
  const [format, setFormat]       = useState('');
  const [jobId, setJobId]         = useState(null);
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [dlStarted, setDlStarted] = useState(false);

  const progress = useSSE(jobId);

  async function handleFetch(pastedUrl) {
    const target = pastedUrl || url;
    if (!target.trim()) return;

    setError('');
    setInfo(null);
    setJobId(null);
    setDlStarted(false);
    setLoading(true);

    if (pastedUrl) setUrl(pastedUrl);

    try {
      const data = await fetchVideoInfo(target);
      setInfo(data);
      setFormat(data.formats?.[1]?.id || data.formats?.[0]?.id); // default to 720p if available
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch video info. Check the URL and try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload() {
    if (!info || !format) return;
    setError('');
    setJobId(null);
    setDlStarted(true);

    const params = new URLSearchParams({ url, format, title: info.title });
    const endpoint = `/api/download?${params.toString()}`;

    try {
      const resp = await fetch(endpoint);

      if (!resp.ok) {
        const body = await resp.json().catch(() => ({}));
        throw new Error(body.error || 'Download failed');
      }

      // Read the job ID from the response header for SSE tracking
      const id = resp.headers.get('X-Job-Id');
      if (id) setJobId(id);

      // Trigger browser file save
      const blob = await resp.blob();
      const a    = document.createElement('a');
      a.href     = URL.createObjectURL(blob);
      a.download = `${info.title}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
    } catch (err) {
      setError(err.message || 'Download failed. Please try again.');
      setDlStarted(false);
    }
  }

  const showProgress = dlStarted && jobId && (progress > 0 || progress === -1);

  return (
    <div style={{
      maxWidth: 680,
      margin: '0 auto',
      padding: '2.5rem 1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>▶</div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.25rem' }}>YouTube Downloader</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Paste a link, pick quality, download.</p>
      </div>

      {/* Main card */}
      <div style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}>
        <UrlInput url={url} setUrl={setUrl} onFetch={handleFetch} loading={loading} />

        {error && (
          <div style={{
            background: 'rgba(231,76,60,0.1)',
            border: '1px solid var(--error)',
            color: 'var(--error)',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
          }}>
            {error}
          </div>
        )}

        {info && (
          <>
            <VideoInfo info={info} />

            <QualitySelector
              formats={info.formats}
              selected={format}
              onChange={setFormat}
            />

            <button
              onClick={handleDownload}
              disabled={dlStarted && progress > 0 && progress < 100}
              style={{
                background: 'var(--red)',
                color: '#fff',
                padding: '0.85rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '1rem',
                width: '100%',
              }}
            >
              {dlStarted && progress > 0 && progress < 100
                ? `Downloading… ${Math.round(progress)}%`
                : '⬇ Download'}
            </button>

            {showProgress && (
              <ProgressBar progress={progress} />
            )}

            {progress >= 100 && (
              <p style={{ textAlign: 'center', color: 'var(--success)', fontWeight: 600 }}>
                ✓ Saved to your Downloads folder
              </p>
            )}
          </>
        )}
      </div>

      <DownloadHistory />
    </div>
  );
}
