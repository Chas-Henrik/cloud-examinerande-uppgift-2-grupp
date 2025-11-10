import { createAuthClient } from './client'
import { Entry, NewEntry, UpdateEntry } from '@/types/database.types'

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

export async function updateEntry(sb_access_token: string, id : string, entry: UpdateEntry) : Promise<Entry> {
  const supabase = createAuthClient(sb_access_token);
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const updateData : UpdateEntry = {};
  if (entry.title !== undefined) updateData.title = entry.title;
  if (entry.content !== undefined) updateData.content = entry.content;

  const { data, error } = await supabase
    .from('entries')
    .update(updateData)
    .eq('id', id!) 
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function deleteEntry(sb_access_token: string, id : string) : Promise<Entry> {
  const supabase = createAuthClient(sb_access_token);
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('entries')
    .delete()
    .eq('id', id!) 
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function saveImageFile(sb_access_token: string, { image }: { image: Blob }) {
  const supabase = createAuthClient(sb_access_token);
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const fileExtension = image.type.split('/')[1];
  const fileName = `${Math.random()}.${fileExtension}`
  const filePath = `private/${user.id}/${fileName}`;
  
  const { data, error } = await supabase
    .storage
    .from('user-images')
    .upload(filePath, image, {
      cacheControl: '3600',
      upsert: false,
      contentType: image.type,
    });

  if (error) {
    throw error
  }

  return data;
}

export async function saveImageMetadata(sb_access_token: string, { entryId, pathName }: { entryId: string, pathName: string }) {
  const supabase = createAuthClient(sb_access_token);
  const { data: { user } } = await supabase.auth.getUser()  
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('user_images')
    .insert([
      {
        user_id: user.id,
        entry_id: entryId,
        path_name: pathName,
      }
    ])

  if (error) {
    throw error 
  }

  return data;
}
