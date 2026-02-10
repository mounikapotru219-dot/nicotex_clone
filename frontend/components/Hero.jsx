'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDES = [
  {
    id: 1,
    image: '/images/banners/b-1.jpeg',
    bg: 'bg-[#cef7ff]'
  },
  {
    id: 2,
    image: '/images/banners/b-2.jpeg',
    bg: 'bg-[#9defe2]'
  },
  {
    id: 3,
    image: '/images/banners/b-3.jpeg',
    bg: 'bg-[#cef7ff]'
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
    <section
      className={`relative h-[450px] lg:h-[550px] w-full overflow-hidden transition-colors duration-1000 ${SLIDES[current].bg}`}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={SLIDES[current].image}
          alt="Hero Banner"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === i
                ? 'w-12 bg-medical-teal'
                : 'w-4 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
