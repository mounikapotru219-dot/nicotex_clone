'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { motion } from 'framer-motion'
import { Lock, User, Loader2, ArrowRight, Shield } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const router = useRouter()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/auth/login', { username, password })
      localStorage.setItem('admin_token', res.data.token)
      router.push('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-600 rounded-2xl shadow-premium mb-6">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">Admin Portal</h2>
        <p className="mt-2 text-sm text-gray-500 font-medium">Secure access to Nicotex Management</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0"
      >
        <div className="bg-white py-10 px-6 sm:px-10 shadow-2xl rounded-3xl border border-white/10">
          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Admin Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-gray-50"
                  placeholder="admin_id"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Security Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-gray-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 font-bold">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-600 text-white rounded-xl py-4 font-bold text-lg flex items-center justify-center hover:bg-brand-700 active:scale-[0.98] transition-all shadow-lg"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Access Dashboard <ArrowRight className="ml-2 w-5 h-5" /></>}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-gray-600 font-bold uppercase tracking-widest">
          Auth v2.4 • Secured via JWT
        </p>
      </motion.div>
    </div>
  )
}
