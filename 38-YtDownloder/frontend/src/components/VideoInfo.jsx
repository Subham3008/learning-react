import React from 'react';

export default function VideoInfo({ info }) {
  function formatDuration(dur) {
    return dur || 'Unknown';
  }

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      padding: '1rem',
    }}>
      <img
        src={info.thumbnail}
        alt={info.title}
        style={{ width: 140, height: 90, objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.3rem', minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {info.title}
        </p>
        {info.uploader && (
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{info.uploader}</p>
        )}
        <p style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>⏱ {formatDuration(info.duration)}</p>
      </div>
    </div>
  );
}
