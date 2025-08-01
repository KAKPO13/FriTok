// utils/api.ts
import { supabase } from '@/lib/supabaseClient';

export const fetchTrendingVideos = async (tag?: string): Promise<VideoItem[]> => {
  let query = supabase
    .from('videos')
    .select('*')
    .eq('isTrending', true)
    .order('created_at', { ascending: false });

  if (tag) query = query.contains('tags', [tag]);

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data || [];
};
