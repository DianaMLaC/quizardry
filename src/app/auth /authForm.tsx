"use client"
import { useState } from "react"
import { signUp, login, loginWithGoogle } from "../api/supabase/util"
import { useAuth } from "./useAuth"

export default function AuthForm() {
  const { user, loading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState("")

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      if (isSignUp) {
        await signUp(email, password)
      } else {
        await login(email, password)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return <p>Loading...</p>
  if (user) return <p>Welcome, {user.email}</p>

  return (
    <div className="p-4 border rounded-lg">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={loginWithGoogle} className="mt-2">
        Sign in with Google
      </button>

      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Login" : "Create an account"}
      </button>
    </div>
  )
}
