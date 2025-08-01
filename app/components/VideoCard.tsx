// components/VideoCard.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { VideoItem } from '@/types/video'

interface VideoCardProps {
  video: VideoItem
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <Link href={`/video/${video.id}`}>
        <div className="relative w-full h-56 bg-gray-200">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            layout="fill"
            objectFit="cover"
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
      </div>
    </div>
  )
}

export default VideoCard
