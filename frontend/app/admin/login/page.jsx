import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState(null)
  const router = useRouter()

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password })
      })
      if (!res.ok) throw new Error('Invalid credentials')
      const data = await res.json()
      localStorage.setItem('admin_token', data.token)
      router.push('/admin/dashboard')
    } catch (err) { setError(err.message) }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Admin Login</h2>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" type="password" />
        <button type="submit">Sign in</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  )
}
