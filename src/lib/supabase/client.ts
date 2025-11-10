// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Supabase environment variables not set')
  return createClient(url, key)
}

export function createAuthClient(sb_access_token: string) {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Supabase environment variables not set')
  return createClient(url, key, {
    global: {
      headers: { Authorization: `Bearer ${sb_access_token}` },
    },
  })
}


