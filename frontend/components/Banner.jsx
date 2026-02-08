'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

export default function Banner({ title, description, breadcrumbs = [], className = "" }) {
    return (
        <section className={`relative overflow-hidden bg-medical-blue ${className || 'py-16 lg:py-20'}`}>
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-medical-blue via-medical-blue/90 to-brand-900" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-medical-teal/10 rounded-full blur-[100px] -z-0 -translate-x-1/2 translate-y-1/2" />

            {/* Decorative Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl">
                    {/* Breadcrumbs */}
                    {breadcrumbs.length > 0 && (
                        <nav className="flex items-center gap-3 mb-6 overflow-x-auto no-scrollbar">
                            <Link href="/" className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 group whitespace-nowrap">
                                <Home className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Home</span>
                            </Link>
                            {breadcrumbs.map((item, idx) => (
                                <React.Fragment key={idx}>
                                    <ChevronRight className="w-3 h-3 text-blue-400 shrink-0" />
                                    <Link
                                        href={item.href}
                                        className={`whitespace-nowrap ${idx === breadcrumbs.length - 1 ? 'text-white' : 'text-blue-200 hover:text-white'} transition-colors`}
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                                    </Link>
                                </React.Fragment>
                            ))}
                        </nav>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                            {title}
                        </h1>
                        {description && (
                            <p className="mt-4 text-base text-blue-100 font-medium leading-relaxed opacity-80 max-w-2xl">
                                {description}
                            </p>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
