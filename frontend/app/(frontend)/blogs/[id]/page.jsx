'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft, Clock, User, Share2, Facebook, Twitter, Link2 } from 'lucide-react'
import Link from 'next/link'

export default function BlogDetailPage() {
    const { id } = useParams()

    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Article Header */}
            <header className="relative h-[400px] lg:h-[600px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1576091160550-217359f42f8c?q=80&w=2070&auto=format&fit=crop"
                    alt="Blog Header"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/90 via-medical-blue/40 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 lg:p-20">
                    <div className="max-w-4xl mx-auto">
                        <Link href="/blogs" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 font-bold transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Blogs
                        </Link>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
                            The First 72 Hours: What to Expect When You Quit
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/80">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">SW</div>
                                <span className="font-bold text-white">Dr. Sarah Wilson</span>
                            </div>
                            <div className="flex items-center gap-2 border-l border-white/20 pl-6">
                                <Clock className="w-5 h-5" />
                                <span>8 min read</span>
                            </div>
                            <div className="flex items-center gap-2 border-l border-white/20 pl-6">
                                <span>Oct 24, 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Main Content */}
                    <article className="lg:w-3/4 prose prose-lg prose-medical max-w-none">
                        <p className="text-xl text-gray-600 leading-relaxed mb-10 font-medium">
                            The journey to becoming smokefree begins with a single step, but the first 72 hours are arguably the most critical period for any quitter. During this window, your body goes through rapid physiological changes as nicotine leaves your bloodstream.
                        </p>

                        <h2 className="text-3xl font-bold text-medical-blue mt-12 mb-6">Day 1: The Initial Shift</h2>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            Within just 20 minutes of your last cigarette, your heart rate and blood pressure begin to drop back toward normal levels. By the 12-hour mark, the carbon monoxide level in your blood drops to normal, allowing more oxygen to reach your organs.
                        </p>

                        <div className="bg-brand-50 border-l-4 border-brand-500 p-8 rounded-r-2xl my-12">
                            <p className="text-brand-800 font-bold italic text-lg leading-relaxed">
                                "Preparation is key. Ensure you have your Mar gums or patches ready before you start the clock."
                            </p>
                        </div>

                        <h2 className="text-3xl font-bold text-medical-blue mt-12 mb-6">The 48-Hour Peak</h2>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            By the second day, your sense of taste and smell will start to improve as your nerve endings begin to regrow. However, this is also when nicotine withdrawal symptoms typically peak. You might feel irritable, anxious, or experience intense cravings.
                        </p>

                        <h2 className="text-3xl font-bold text-medical-blue mt-12 mb-6">72 Hours: Breathing Easier</h2>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            After 3 days, nicotine is completely out of your body. Your bronchial tubes start to relax, making breathing easier. Your energy levels will also start to increase, though cravings may still persist.
                        </p>
                    </article>

                    {/* Social / Sidebar */}
                    <aside className="lg:w-1/4">
                        <div className="sticky top-32 space-y-12">
                            <div>
                                <h4 className="font-bold text-medical-blue uppercase tracking-widest text-xs mb-6">Share Article</h4>
                                <div className="flex flex-col gap-4">
                                    <button className="flex items-center gap-3 text-gray-500 hover:text-brand-600 font-medium">
                                        <Facebook className="w-5 h-5" /> Facebook
                                    </button>
                                    <button className="flex items-center gap-3 text-gray-500 hover:text-brand-600 font-medium">
                                        <Twitter className="w-5 h-5" /> Twitter
                                    </button>
                                    <button className="flex items-center gap-3 text-gray-500 hover:text-brand-600 font-medium">
                                        <Link2 className="w-5 h-5" /> Copy Link
                                    </button>
                                </div>
                            </div>

                            <div className="bg-medical-slate p-6 rounded-2xl">
                                <h4 className="font-bold text-medical-blue mb-4">Related Products</h4>
                                <div className="space-y-4">
                                    <div className="bg-white p-3 rounded-xl border border-gray-100 flex gap-3">
                                        <div className="w-12 h-12 bg-gray-50 rounded-lg" />
                                        <div className="text-xs">
                                            <p className="font-bold">Mar Gum 2mg</p>
                                            <p className="text-brand-600 mt-1">₹499</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
