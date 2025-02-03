"use client"
import { logout } from "../../app/api/supabase/util"
import { useAuth } from "../../app/auth /useAuth"
import styles from "./nav.module.css"

export default function Navbar() {
  const { user } = useAuth()
  console.log({ user })

  return (
    <nav className={styles.navBox}>
      <h1 className={styles.title}>Quizardry</h1>
      <div>
        {user ? (
          <div>
            <span>Welcome, {user.email}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <span>Please use the form bellow to sign in</span>
        )}
      </div>
    </nav>
  )
}
