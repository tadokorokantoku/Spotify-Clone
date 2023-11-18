import { Song } from '@/types';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
type useSongsProps = string | undefined;

const useSongs = (userId: useSongsProps): Song[] => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    supabase
      .from('songs')
      .select('*')
      .eq('user_id', userId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .then(
        res => setSongs(res.data ?? []),
        err => console.log(err),
      );
  }, [userId]);

  if (!userId) {
    return [];
  }

  return songs;
};

export default useSongs;
