import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { UserDetails } from '@/types'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const useUsers = (): UserDetails[] => {
  const [users, setUsers] = useState<UserDetails[]>([])

  useEffect(() => {
    supabase
      .from('users')
      .select('*')
      .then((res) => {
        setUsers(res.data ?? []);
      }, (err) => { console.log(err)});
  }, []);
    
  return users;
}