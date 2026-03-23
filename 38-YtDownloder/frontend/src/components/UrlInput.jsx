import React from 'react';

export default function UrlInput({ url, setUrl, onFetch, loading }) {
  function handlePaste(e) {
    const pasted = e.clipboardData.getData('text');
    if (pasted.includes('youtube.com') || pasted.includes('youtu.be')) {
      setTimeout(() => onFetch(pasted), 100);
    }
  }

  return (
    <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
      <input
        type="text"
        placeholder="Paste YouTube URL here..."
        value={url}
        onChange={e => setUrl(e.target.value)}
        onPaste={handlePaste}
        onKeyDown={e => e.key === 'Enter' && onFetch()}
        style={{ flex: 1 }}
      />
      <button
        onClick={() => onFetch()}
        disabled={loading || !url.trim()}
        style={{
          background: 'var(--red)',
          color: '#fff',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        {loading ? 'Fetching…' : 'Get Video'}
      </button>
    </div>
  );
}
