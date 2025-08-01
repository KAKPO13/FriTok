// components/DiscoverFeed.tsx
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useTrendingVideos } from '@/hooks/useTrendingVideos';
import { VideoCard } from '@/components/VideoCard';

type DiscoverFeedProps = {
  tagFilter?: string; // Pour filtrer les vidéos par tag tendance
};

const DiscoverFeed: React.FC<DiscoverFeedProps> = ({ tagFilter }) => {
  const { videos, loading, error } = useTrendingVideos(tagFilter);

  return (
    <MainLayout>
      <section className="px-4 py-6 max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">🔥 Découverte tendance</h1>
        
        {loading && <p>Chargement des vidéos...</p>}
        {error && <p className="text-red-500">Erreur de chargement 😵</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map(video => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default DiscoverFeed;
