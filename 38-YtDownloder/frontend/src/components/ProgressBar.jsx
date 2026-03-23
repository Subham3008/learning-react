import React from 'react';

export default function ProgressBar({ progress, status }) {
  const isError    = progress === -1 || status === 'failed';
  const isComplete = progress >= 100 || status === 'completed';
  const display    = isError ? 100 : Math.max(0, Math.min(100, progress));
  const color      = isError ? 'var(--error)' : isComplete ? 'var(--success)' : 'var(--red)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--muted)' }}>
        <span>
          {isError    ? '✕ Download failed'    :
           isComplete ? '✓ Download complete!' :
                        'Downloading…'}
        </span>
        {!isError && <span>{Math.round(display)}%</span>}
      </div>
      <div style={{ height: '6px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${display}%`,
            background: color,
            borderRadius: '999px',
            transition: 'width 0.3s ease, background 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
