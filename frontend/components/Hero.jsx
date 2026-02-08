'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const SLIDES = [
    {
        id: 1,
        badge: 'New Flavor',
        title: 'PAAN',
        subtitle: 'BLISS',
        desc: 'A fresh way to curb tobacco urges!',
        image: 'https://media.istockphoto.com/id/1141703666/photo/nicotine-gum-to-help-quit-smoking.jpg?s=612x612&w=0&k=20&c=vW829-WjR5i6oV6q9-P-vQy9-i_Jz6Y-h6xWjM-q-vY=',
        color: 'bg-[#cef7ff]' // Pale Cyan
    },
    {
        id: 2,
        badge: 'Best Seller',
        title: 'MINT',
        subtitle: 'FRESH',
        desc: 'Cool release for instant relief.',
        image: 'https://images.unsplash.com/photo-1550573105-4584e8d30491?q=80&w=2070&auto=format&fit=crop',
        color: 'bg-[#9defe2]' // Light Teal
    },
    {
        id: 3,
        badge: 'Top Rated',
        title: 'FRUIT',
        subtitle: 'BLAST',
        desc: 'Tasty way to stop smoking forever.',
        image: 'https://images.unsplash.com/photo-1626015694246-86c3def5df95?q=80&w=2070&auto=format&fit=crop',
        color: 'bg-[#cef7ff]'
    }
]

export default function Hero() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className={`relative h-[450px] lg:h-[550px] w-full overflow-hidden transition-colors duration-1000 ${SLIDES[current].color}`}>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-medical-teal/5" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10 flex items-center">
                <AnimatePresence mode="wait">
                    <div key={current} className="grid lg:grid-cols-2 gap-12 items-center w-full absolute inset-x-4 lg:inset-x-8 max-w-7xl mx-auto top-1/2 -translate-y-1/2">
                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.5 }}
                            className="text-left"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-medical-teal text-white font-black text-[10px] uppercase tracking-widest mb-6 shadow-sm">
                                {SLIDES[current].badge}
                            </span>
                            <h1 className="text-5xl lg:text-8xl font-black text-medical-blue leading-tight mb-4 tracking-tighter">
                                {SLIDES[current].title} <span className="text-medical-teal uppercase italic">{SLIDES[current].subtitle}</span>
                            </h1>
                            <p className="text-xl lg:text-3xl text-medical-blue/80 font-bold mb-10">
                                {SLIDES[current].desc}
                            </p>
                            <Link href="/products" className="bg-medical-blue text-white px-12 py-5 rounded-xl font-black text-xl shadow-2xl hover:bg-brand-700 transition-all inline-block">
                                Explore Now
                            </Link>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
                            transition={{ duration: 0.5 }}
                            className="relative hidden lg:block ml-auto"
                        >
                            <img
                                src={SLIDES[current].image}
                                alt={SLIDES[current].title}
                                className="w-full max-w-lg drop-shadow-2xl rounded-[3rem]"
                            />
                        </motion.div>
                    </div>
                </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-30">
                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${current === i ? 'w-16 bg-medical-teal' : 'w-4 bg-gray-300 hover:bg-gray-400'}`}
                    />
                ))}
            </div>
        </section>
    )
}
