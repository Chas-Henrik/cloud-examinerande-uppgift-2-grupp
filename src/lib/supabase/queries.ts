import { createAuthClient } from './client'
import { Entry, NewEntry } from '@/types/database.types'

/**
 * Fetch all entries for the authenticated user
 */
export async function getEntries(sb_access_token: string): Promise<Entry[]> {
  const supabase = createAuthClient(sb_access_token);
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data || []
}

/**
 * Create a new entry for the authenticated user
 */
export async function createEntry(sb_access_token: string, entry: NewEntry): Promise<Entry> {
  const supabase = createAuthClient(sb_access_token);
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('entries')
    .insert([
      {
        user_id: user.id,
        title: entry.title,
        content: entry.content,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}
