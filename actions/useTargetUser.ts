import { UserDetails } from '@/types';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type useSongsProps = string | undefined;

export const useTargetUser = (userId: useSongsProps): UserDetails | null => {
  const [user, setUser] = useState<UserDetails | null>(null);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }

    supabase
      .from('users')
      .select('*')
      .eq('id', userId ?? '')
      .single()
      .then(
        res => {
          setUser(res.data ?? null);
        },
        err => {
          console.log(err);
        },
      );
  }, [userId]);

  return user;
};
