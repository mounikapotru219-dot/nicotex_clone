'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import api from '@/lib/api'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader2, ArrowRight, ShieldCheck, User as UserIcon } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const router = useRouter()
    const login = useAuthStore((state) => state.login)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const res = await api.post('/auth/login', { username, password })
            login(res.data.user, res.data.token)
            router.push('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left Side: Brand/Image Section */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-medical-blue">
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-medical-blue/80 via-medical-blue/40 to-transparent" />
                <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop"
                    alt="Nicotex Journey"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] hover:scale-110"
                />

                <div className="relative z-20 flex flex-col justify-between p-16 w-full">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-600 font-black text-2xl shadow-2xl">N</div>
                        <span className="text-3xl font-black tracking-tight text-white">Nicotex</span>
                    </Link>

                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-8">
                                Start Your Journey to <span className="text-medical-teal">Freedom.</span>
                            </h2>
                            <p className="text-xl text-blue-100/80 max-w-lg mb-12 font-medium leading-relaxed">
                                Join over 10 million people who successfully quit smoking with Nicotex's clinically-proven support system.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { label: 'Active Users', val: '10M+' },
                                { label: 'Success Rate', val: '98%' },
                                { label: 'Expert Support', val: '24/7' },
                                { label: 'Products', val: '50+' }
                            ].map((stat, i) => (
                                <div key={i} className="border-l-2 border-white/20 pl-6">
                                    <p className="text-3xl font-black text-white mb-1">{stat.val}</p>
                                    <p className="text-sm font-bold text-blue-200 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-white/60 text-xs font-bold uppercase tracking-[0.3em]">
                        <span>© 2026 Nicotex Wellness</span>
                        <div className="h-1 w-1 rounded-full bg-white/30" />
                        <span>Privacy Policy</span>
                    </div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-md"
                >
                    <div className="lg:hidden mb-12">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">N</div>
                            <span className="text-2xl font-black tracking-tight text-medical-blue">Nicotex</span>
                        </Link>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-4xl font-black text-medical-blue mb-4">Welcome Back</h3>
                        <p className="text-gray-500 font-medium">Log in to your account to continue your progress.</p>
                    </div>

                    <div className="bg-white p-10 lg:p-12 rounded-[3rem] shadow-premium border border-gray-100 relative overflow-hidden">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Username or Email</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-600 transition-colors">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full h-16 pl-14 pr-6 bg-gray-50 border-2 border-transparent focus:border-brand-500 focus:bg-white rounded-2xl outline-none font-bold text-medical-blue transition-all"
                                        placeholder="john_doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-3 ml-1">
                                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest">Password</label>
                                    <Link href="/auth/forgot-password" size="sm" className="text-xs font-black text-brand-600 hover:text-brand-700 transition-colors">
                                        Forgot?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-600 transition-colors">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-16 pl-14 pr-6 bg-gray-50 border-2 border-transparent focus:border-brand-500 focus:bg-white rounded-2xl outline-none font-bold text-medical-blue transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-red-50 text-red-600 text-sm p-4 rounded-2xl border border-red-100 font-bold"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-brand-700 hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                            >
                                {loading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        Sign In <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 text-center">
                            <p className="text-gray-500 font-bold">
                                New here? <Link href="/auth/register" className="text-brand-600 hover:text-brand-700 transition-colors hover:underline">Create an account</Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
