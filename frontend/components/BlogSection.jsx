'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Mock data
// Mock data
const MOCK_BLOGS = [
    {
        _id: '1',
        title: 'The First 72 Hours: What to Expect When You Quit',
        excerpt: 'The first three days are the most challenging. Learn how to navigate the physical withdrawal symptoms effectively...',
        author: 'Dr. Sarah Wilson',
        date: 'Oct 24, 2025',
        category: 'Medical Advice',
        image: 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?q=80&w=2070&auto=format&fit=crop'
    },
    {
        _id: '2',
        title: 'How Nicotine Gums Actually Work in Your System',
        excerpt: 'Understanding the pharmokinetics of nicotine replacement therapy can help you use it better and quit faster...',
        author: 'Medical Team',
        date: 'Oct 20, 2025',
        category: 'Lifestyle',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop'
    },
    {
        _id: '3',
        title: '5 Healthy Habits to Replace Your Morning Smoke',
        excerpt: 'Replacing habits is easier than breaking them. Try these science-backed morning routines to start your day right...',
        author: 'Wellness Coach',
        date: 'Oct 15, 2025',
        category: 'Success Stories',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop'
    },
    {
        _id: '4',
        title: 'Understanding Nicotine Withdrawal Symptoms',
        excerpt: 'Withdrawal is the body’s way of healing. Here is a timeline of what happens when you stop smoking regarding your health.',
        author: 'Dr. Emily Chen',
        date: 'Oct 10, 2025',
        category: 'Medical Facts',
        image: 'https://images.unsplash.com/photo-1505751172107-57325a3ec716?q=80&w=2070&auto=format&fit=crop'
    },
    {
        _id: '5',
        title: 'Success Story: How John Quit After 20 Years',
        excerpt: 'Read about John’s inspiring journey from a pack a day to being completely smoke-free for over two years now.',
        author: 'Community Team',
        date: 'Oct 05, 2025',
        category: 'Success Stories',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop'
    },
    {
        _id: '6',
        title: 'Top 10 Foods to Help Curb Cravings',
        excerpt: 'Discover which foods can help reduce your urge to smoke and detoxify your body faster during the quitting process.',
        author: 'Nutritionist Jane',
        date: 'Oct 01, 2025',
        category: 'Nutrition',
        image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1932&auto=format&fit=crop'
    }
]

export default function BlogSection({ hideHeader = false, standalone = true, blogs = MOCK_BLOGS, limit = 3 }) {
    // Carousel State
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        // Auto-scroll every 5 seconds
        const interval = setInterval(() => {
            handleNext()
        }, 5000)
        return () => clearInterval(interval)
    }, [currentIndex]) // Re-set interval on interaction

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(blogs.length / limit))
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + Math.ceil(blogs.length / limit)) % Math.ceil(blogs.length / limit))
    }

    const currentBlogs = blogs.slice(
        currentIndex * limit,
        (currentIndex + 1) * limit
    )

    // If we run out of items at the end (e.g. 5 items, limit 3, page 2 has 2 items), it's fine.
    // If we want infinite loop with full pages, logic is more complex, but this pagination carousel is standard.

    // Fallback if empty
    if (!blogs || blogs.length === 0) return null

    return (
        <div className="max-w-7xl mx-auto">
            {!hideHeader && (
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-medical-blue mb-4">Latest Insights</h2>
                    <Link href="/blogs" className="text-medical-teal font-bold uppercase tracking-widest text-sm hover:underline">View All Articles</Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBlogs.map((blog) => (
                    <motion.div
                        key={blog._id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white group text-left flex flex-col h-full"
                    >
                        <Link href={`/blogs/${blog._id}`} className="block aspect-[16/10] relative overflow-hidden rounded-[2rem] mb-6 shadow-md shadow-gray-200">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </Link>
                        <div className="px-2 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-black text-medical-teal uppercase tracking-widest bg-teal-50 px-2 py-1 rounded-md">{blog.category}</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{blog.date}</span>
                            </div>
                            <h3 className="text-lg font-black text-medical-blue mb-4 leading-tight group-hover:text-brand-600 transition-colors line-clamp-2">
                                {blog.title}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-grow">{blog.excerpt}</p>
                            <Link href={`/blogs/${blog._id}`} className="text-medical-teal font-black text-sm underline underline-offset-4 hover:text-brand-600 transition-colors mt-auto">
                                Read More
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Arrows */}
            {blogs.length > limit && (
                <div className="mt-8 flex justify-center items-center gap-6">
                    <button
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-full border-2 border-medical-blue flex items-center justify-center text-medical-blue hover:bg-medical-blue hover:text-white transition-all shadow-md active:scale-95"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex gap-2">
                        {Array.from({ length: Math.ceil(blogs.length / limit) }).map((_, idx) => (
                            <div key={idx} className={`w-2 h-2 rounded-full transition-all ${currentIndex === idx ? 'bg-medical-blue w-6' : 'bg-gray-300'}`} />
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        className="w-10 h-10 rounded-full border-2 border-medical-blue flex items-center justify-center text-medical-blue hover:bg-medical-blue hover:text-white transition-all shadow-md active:scale-95"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    )
}
