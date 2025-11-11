export interface Entry {
  id: string
  user_id: string
  title: string
  content: string
  created_at: string
  user_images?: UserImage[]
  files?: ImageFile[] // Array of base64-encoded image data
}

export interface NewEntry {
  title: string
  content: string
}

export interface UpdateEntry {
  title?: string
  content?: string
}

export interface UserImage {
  id: string;
  user_id: string;
  entry_id: string;
  path_name: string;
  created_at: string;
}

export interface ImageFile {
  created_at : string
  entry_id : string 
  file_data : string 
  id : string 
  path_name : string
  user_id : string 
}