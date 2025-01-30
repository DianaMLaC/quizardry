import { supabase } from "./supabase"

// Sign Up with Email & Password
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error
  return data
}

// Login with Email & Password
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

// Login with Google
export const loginWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google" })
  if (error) throw error
  return data
}

// Logout
export const logout = async () => {
  await supabase.auth.signOut()
}
