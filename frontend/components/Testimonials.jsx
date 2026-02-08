'use client'

import React, { useState, useEffect } from 'react'
import { Quote, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'

const SUCCESS_STORIES = [
    {
        id: 1,
        name: 'Akash Sharma',
        role: 'Quit 6 months ago',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Priya Patel',
        role: 'Quit 1 year ago',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'David Miller',
        role: 'Quit 3 months ago',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop'
    },
    {
        id: 4,
        name: 'Sarah Jenkins',
        role: 'Quit 9 months ago',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
    }
]

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const ITEMS_PER_PAGE = 3

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext()
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % SUCCESS_STORIES.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length)
    }

    const getVisibleStories = () => {
        const visible = []
        for (let i = 0; i < ITEMS_PER_PAGE; i++) {
            visible.push(SUCCESS_STORIES[(currentIndex + i) % SUCCESS_STORIES.length])
        }
        return visible
    }

    const visibleStories = getVisibleStories()

    return (
        <section className="py-2 bg-white relative overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-30" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {visibleStories.map((story, idx) => (
                        <motion.div
                            key={`${story.id}-${idx}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group"
                        >
                            <div className="relative aspect-video bg-black group-hover:brightness-110 transition-all">
                                <video
                                    src={story.videoUrl}
                                    className="w-full h-full object-cover"
                                    controls
                                    poster={story.thumbnail}
                                />
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full">
                                    <Quote className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-lg text-medical-blue mb-1">{story.name}</h4>
                                <p className="text-xs font-bold text-brand-600 uppercase tracking-widest">{story.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Navigation Controls */}
                <div className="mt-12 flex justify-center items-center gap-6">
                    <button
                        onClick={handlePrev}
                        className="w-12 h-12 rounded-full border-2 border-medical-blue flex items-center justify-center text-medical-blue hover:bg-medical-blue hover:text-white transition-all shadow-md active:scale-95 bg-white"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-12 h-12 rounded-full border-2 border-medical-blue flex items-center justify-center text-medical-blue hover:bg-medical-blue hover:text-white transition-all shadow-md active:scale-95 bg-white"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    )
}
