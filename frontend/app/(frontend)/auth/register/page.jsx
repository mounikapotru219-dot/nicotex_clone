'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        // In a real app, call register API here
        setTimeout(() => {
            setLoading(false)
            router.push('/auth/login')
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left Side: Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-lg"
                >
                    <div className="lg:hidden mb-12">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/images/logos/logo.jpeg" alt="Mar Logo" className="h-12 w-auto" />
                        </Link>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-4xl font-black text-medical-blue mb-4">Create Account</h3>
                        <p className="text-gray-500 font-medium font-bold">Sign up today and take your first step toward freedom.</p>
                    </div>

                    <div className="bg-white p-10 lg:p-12 rounded-[3rem] shadow-premium border border-gray-100 relative overflow-hidden">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">First Name</label>
                                    <input type="text" required className="w-full h-14 px-6 bg-gray-50 border-2 border-transparent focus:border-brand-500 focus:bg-white rounded-2xl outline-none font-bold text-medical-blue transition-all" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Last Name</label>
                                    <input type="text" required className="w-full h-14 px-6 bg-gray-50 border-2 border-transparent focus:border-brand-500 focus:bg-white rounded-2xl outline-none font-bold text-medical-blue transition-all" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-600 transition-colors">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <input type="email" required className="w-full h-16 pl-14 pr-6 bg-gray-50 border-2 border-transparent focus:border-brand-500 focus:bg-white rounded-2xl outline-none font-bold text-medical-blue transition-all" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-600 transition-colors">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input type="password" required className="w-full h-16 pl-14 pr-6 bg-gray-50 border-2 border-transparent focus:border-brand-500 focus:bg-white rounded-2xl outline-none font-bold text-medical-blue transition-all" placeholder="••••••••" />
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 font-bold leading-relaxed">
                                By signing up, you agree to our <a href="#" className="text-brand-600 underline">Terms</a> and <a href="#" className="text-brand-600 underline">Privacy</a>.
                            </p>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-brand-700 hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                            >
                                {loading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        Create Account <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 text-center border-t border-gray-50 pt-8">
                            <p className="text-gray-500 font-bold font-medium">
                                Already have an account? <Link href="/auth/login" className="text-brand-600 hover:text-brand-700 transition-colors hover:underline">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Side: Brand/Image Section */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-medical-blue">
                {/* <div className="absolute inset-0 z-10 bg-gradient-to-bl from-medical-blue/80 via-medical-blue/40 to-transparent" /> */}
                <img
                src="/images/banners/Banner_Mar.png"
                    // src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop"
                    alt="Success"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] hover:scale-110"
                />

                {/* <div className="relative z-20 flex flex-col justify-between p-16 w-full text-right items-end">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/images/logos/logo.jpeg" alt="Nicotex Logo" className="h-16 w-auto" />
                    </Link>

                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-8">
                                Join our <br /><span className="text-medical-teal">Community.</span>
                            </h2>
                            <p className="text-xl text-blue-100/80 max-w-lg mb-12 font-medium leading-relaxed ml-auto">
                                Be part of a global movement towards a healthier, smoke-free future. Get personalized tools and expert guidance.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-8 text-right">
                            {[
                                { label: 'Active Users', val: '10M+' },
                                { label: 'Success Rate', val: '98%' },
                                { label: 'Expert Tips', val: '1000+' },
                                { label: 'Total Sales', val: '25M+' }
                            ].map((stat, i) => (
                                <div key={i} className="border-r-2 border-white/20 pr-6">
                                    <p className="text-3xl font-black text-white mb-1">{stat.val}</p>
                                    <p className="text-sm font-bold text-blue-200 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-white/60 text-xs font-bold uppercase tracking-[0.3em]">
                        <span>Privacy Policy</span>
                        <div className="h-1 w-1 rounded-full bg-white/30" />
                        <span>© 2026 Nicotex Wellness</span>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
