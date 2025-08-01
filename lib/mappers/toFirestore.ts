// lib/mappers/toFirestore.ts
import { VideoItem } from '@/types/video'
import { Timestamp } from 'firebase/firestore'

export const toFirestore = (video: VideoItem) => {
  return {
    video_id: video.video_id ?? '',
    created_at: Timestamp.fromDate(video.created_at ?? new Date()),
    detail_article: video.detail_article ?? '',
    prix_article: video.prix_article ?? 0,
    nom_article: video.nom_article ?? '',
    ref_article: video.ref_article ?? '',
    user_id: video.user_id ?? '',
    id_boutique: video.id_boutique ?? '',
    url: video.url ?? ''
  }
}
