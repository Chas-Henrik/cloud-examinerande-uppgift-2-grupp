import { createAuthClient } from './client'
import { Entry, NewEntry, UpdateEntry } from '@/types/database.types'
import { UserImage } from '@/types/database.types';

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
    .select('*, user_images(*)')
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

export async function getImages(sb_access_token: string, entries: Entry[]) {
  const supabase = createAuthClient(sb_access_token);
  const bucket = "user-images"; 

  const entriesWithFiles = await Promise.all(
    entries.map(async (entry) => {
      if (!entry.user_images || entry.user_images.length === 0) {
        return { ...entry, files: [] };
      }

      const files = await Promise.all(
        entry.user_images.map(async (img : UserImage) => {
          const { data, error } = await supabase.storage.from(bucket).download(img.path_name);
          if (error) {
            console.error(`Error downloading ${img.path_name}:`, error.message);
            return { ...img, file_data: null };
          }

          // Convert binary data to base64 for JSON transport
          const arrayBuffer = await data.arrayBuffer();
          const base64String = Buffer.from(arrayBuffer).toString("base64");

          return {
            ...img,
            file_data: `data:image/${img.path_name.split("/")[2].split(".")[2]};base64,${base64String}`,
          };
        })
      );

      return { ...entry, files };
    })
  );

  return entriesWithFiles;
}