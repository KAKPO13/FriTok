// hooks/useTrendingVideos.ts
import { useEffect, useState } from 'react';
import { fetchTrendingVideos } from '@/utils/api';

export const useTrendingVideos = (tag?: string) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrendingVideos(tag)
      .then(res => setVideos(res))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [tag]);

  return { videos, loading, error };
};
