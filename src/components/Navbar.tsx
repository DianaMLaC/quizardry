import { useAuth } from "../app/auth /useAuth"

export default function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1>Quizardry</h1>
      <div>{user ? <span>Welcome, {user.email}</span> : <a href="/auth">Login</a>}</div>
    </nav>
  )
}
