'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        // In a real app, call existing forgot password endpoint here
        setTimeout(() => {
            setLoading(false)
            setSuccess(true)
        }, 1500)
    }

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sm:mx-auto sm:w-full sm:max-w-md"
            >
                <Link href="/auth/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-600 mb-8 font-bold transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>
                <h2 className="text-3xl font-extrabold text-medical-blue">Reset Password</h2>
                <p className="mt-2 text-sm text-gray-600">Enter your email and we'll send you a recovery link.</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0"
            >
                <div className="bg-white py-10 px-6 sm:px-10 shadow-premium rounded-3xl border border-gray-100">
                    {success ? (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-medical-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-medical-teal" />
                            </div>
                            <h3 className="text-2xl font-bold text-medical-blue mb-2">Check your inbox</h3>
                            <p className="text-gray-500 mb-8">We've sent a password reset link to <span className="font-bold text-medical-blue">{email}</span></p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="text-brand-600 font-bold hover:underline"
                            >
                                Didn't get the email? Try again
                            </button>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-bold text-medical-blue mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-field pl-12"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary w-full flex justify-center items-center py-4 text-lg"
                                >
                                    {loading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
