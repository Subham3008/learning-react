import { useEffect, useState } from 'react';

/**
 * Subscribes to the SSE progress stream for a given jobId.
 * Returns the current progress (0-100) or -1 for error.
 */
export function useSSE(jobId) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!jobId) return;

    setProgress(0);
    const es = new EventSource(`/api/progress/${jobId}`);

    es.onmessage = e => {
      const { progress: pct } = JSON.parse(e.data);
      setProgress(pct);
      if (pct >= 100 || pct === -1) es.close();
    };

    es.onerror = () => {
      es.close();
    };

    return () => es.close();
  }, [jobId]);

  return progress;
}
