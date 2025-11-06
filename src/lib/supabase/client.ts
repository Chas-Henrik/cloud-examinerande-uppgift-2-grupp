import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function createAuthClient(sb_access_token: string) {
    return createClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            global: {
                headers: { Authorization: `Bearer ${sb_access_token}` },
            },
        }
    );
}

