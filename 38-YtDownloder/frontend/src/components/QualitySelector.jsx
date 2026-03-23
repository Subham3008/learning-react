import React from 'react';

export default function QualitySelector({ formats, selected, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ color: 'var(--muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Quality
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {formats.map(fmt => (
          <button
            key={fmt.id}
            onClick={() => onChange(fmt.id)}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '999px',
              border: `1.5px solid ${selected === fmt.id ? 'var(--red)' : 'var(--border)'}`,
              background: selected === fmt.id ? 'var(--red)' : 'var(--surface)',
              color: selected === fmt.id ? '#fff' : 'var(--text)',
              fontWeight: 500,
              fontSize: '0.9rem',
            }}
          >
            {fmt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
