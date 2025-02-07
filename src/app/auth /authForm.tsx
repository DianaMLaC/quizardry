"use client"
import { useState } from "react"
import { signUp, login, loginWithGoogle } from "../api/supabase/util"
import { useAuth } from "./useAuth"
import styles from "./auth.module.css"

export default function AuthForm() {
  const { user, loading } = useAuth()
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState("")
  const [showVerificationModal, setShowVerificationModal] = useState(false)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      if (isSignUp) {
        console.log("auth form is calling SignUp with:", email, password)
        await signUp(email, password, displayName)
        setShowVerificationModal(true)
      } else {
        await login(email, password)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred")
      }
    }
  }

  if (loading) return <p>Loading...</p>
  if (user) return <p>Welcome, {user.email}</p>

  return (
    <div className={styles.authFormBox}>
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      {/* Verification Modal */}
      {showVerificationModal && (
        <div className={styles.verification}>
          <h3>Verify Your Email</h3>
          <p>
            A verification link has been sent to <strong>{email}</strong>. Please check your inbox
            and confirm your email to access the quiz.
          </p>
        </div>
      )}
      <form onSubmit={handleAuth}>
        {isSignUp ? (
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        ) : (
          <div></div>
        )}
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
      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.authGoogle} onClick={loginWithGoogle}>
        Sign in with Google
      </button>

      <div className={styles.formAuthType} onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Login" : "First time? Create an account"}
      </div>
    </div>
  )
}
