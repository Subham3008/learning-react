import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../api/downloadApi.js';

const STATUS_COLOR = {
  completed: 'var(--success)',
  failed:    'var(--error)',
  started:   'var(--red)',
};

export default function DownloadHistory() {
  const [history, setHistory] = useState([]);
  const [open, setOpen]       = useState(false);

  useEffect(() => {
    if (open) fetchHistory().then(setHistory).catch(() => {});
  }, [open]);

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'transparent',
          color: 'var(--muted)',
          border: '1px solid var(--border)',
          padding: '0.4rem 1rem',
          borderRadius: '8px',
          fontSize: '0.85rem',
        }}
      >
        {open ? '▲ Hide history' : '▼ Show download history'}
      </button>

      {open && (
        <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {history.length === 0 && (
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No downloads yet.</p>
          )}
          {history.map(item => (
            <div key={item.jobId} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.6rem 0.85rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              gap: '1rem',
            }}>
              <span style={{ fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                {item.title || item.url}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{item.format}</span>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: STATUS_COLOR[item.status] || 'var(--muted)',
                whiteSpace: 'nowrap',
              }}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
