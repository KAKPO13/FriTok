// lib/mappers/fromFirestore.ts
import { VideoItem } from '@/types/video'

export const fromFirestore = (doc: FirebaseFirestore.DocumentSnapshot): VideoItem => {
  const data = doc.data()

  if (!data) throw new Error('Document data is undefined')

  return {
    video_id: data.video_id ?? '',
    created_at: data.created_at?.toDate?.() ?? new Date(),
    detail_article: data.detail_article ?? '',
    prix_article: data.prix_article ?? 0,
    nom_article: data.nom_article ?? '',
    ref_article: data.ref_article ?? '',
    user_id: data.user_id ?? '',
    id_boutique: data.id_boutique ?? '',
    url: data.url ?? '',
  }
}
