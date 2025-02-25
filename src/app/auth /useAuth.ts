"use client"
import { useEffect, useState } from "react"
import { supabase } from "../api/supabase/supabase"
import { useRouter } from "next/navigation"
import { User } from "@supabase/supabase-js"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check user session
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
      if (user) {
        console.log({ user })
        router.push("/quiz")
      }
    }

    getUser()

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        router.push("/quiz")
      } else {
        router.push("/")
      }
    })

    return () => authListener.subscription.unsubscribe()
  }, [router])

  return { user, loading }
}
