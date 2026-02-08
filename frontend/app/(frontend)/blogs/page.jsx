'use client'

import React from 'react'
import BlogSection from '@/components/BlogSection'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Banner from '@/components/Banner'

export default function BlogsPage() {
    const router = useRouter()

    return (
        <div className="bg-white pb-8 overflow-x-hidden">
            <Banner
                title={<>Health & <span className="text-medical-teal">Wellness Journal</span></>}
                breadcrumbs={[{ label: 'Blogs', href: '/blogs' }]}
                className="py-24 lg:py-32"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-20">
                {/* Featured Articles - Simplified Grid */}
                <div className="mb-12">
                    <h2 className="text-2xl font-black text-medical-blue mb-6">Featured Stories</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 relative h-64 md:h-auto rounded-3xl overflow-hidden group shadow-md">
                            <img
                                src="https://images.unsplash.com/photo-1576091160550-217359f42f8c?q=80&w=2070&auto=format&fit=crop"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                alt="Main Feature"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2">EDITOR'S CHOICE</span>
                                <h3 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight">Expert Guide: Managing Cravings</h3>
                                <Link href="/blogs/1" className="text-white/90 text-sm font-bold hover:text-white flex items-center gap-1">Read Article <ChevronRight className="w-4 h-4" /></Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            {[
                                { title: 'The Role of Nutrition', cat: 'Lifestyle', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop' },
                                { title: 'Celebrity Stories', cat: 'Inspiration', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop' }
                            ].map((post, i) => (
                                <Link key={i} href={`/blogs/${i + 2}`} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full">
                                    <img src={post.img} className="w-24 h-24 rounded-xl object-cover shrink-0" alt={post.title} />
                                    <div className="flex flex-col justify-center">
                                        <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-1">{post.cat}</span>
                                        <h4 className="text-base font-black text-medical-blue mb-1 line-clamp-2 leading-snug">{post.title}</h4>
                                        <div className="text-xs text-gray-400 font-bold flex items-center gap-1 mt-auto">Read <ChevronRight className="w-3 h-3" /></div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Blog Grid Area */}
                <div className="py-4">
                    <h2 className="text-2xl font-black text-medical-blue mb-6">Latest Articles</h2>
                    <BlogSection standalone={false} hideHeader={true} limit={6} />
                </div>

                {/* Pagination - Simplified */}
                <div className="mt-8 flex justify-center items-center gap-2">
                    <Link href="/blogs?page=1" className="w-10 h-10 rounded-lg flex items-center justify-center bg-brand-600 text-white font-bold text-sm">1</Link>
                    <Link href="/blogs?page=2" className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-gray-200 text-gray-500 font-bold text-sm hover:border-brand-500 hover:text-brand-600">2</Link>
                    <Link href="/blogs?page=3" className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-gray-200 text-gray-500 font-bold text-sm hover:border-brand-500 hover:text-brand-600">3</Link>
                    <span className="text-gray-300 font-black px-2">...</span>
                    <Link href="/blogs?page=2" className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:text-brand-600 hover:border-brand-500"><ChevronRight className="w-4 h-4" /></Link>
                </div>
            </div>
        </div>
    )
}
