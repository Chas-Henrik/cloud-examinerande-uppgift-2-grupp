import { supabase, createAuthClient } from './client'
import { LoginCredentials, SignupCredentials } from '@/types/auth.types'

/**
 * Sign up a new user with email and password
 */
export async function signUp({ email, password }: SignupCredentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw error
  }

  if (!data.session) {
    // No session created → likely user already exists or needs confirmation
    throw new Error('User already exists or email not confirmed');
  }

  return data
}

/**
 * Sign in an existing user with email and password
 */
export async function signIn({ email, password }: LoginCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser(sb_access_token: string) {
  const supabase = createAuthClient(sb_access_token);
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
