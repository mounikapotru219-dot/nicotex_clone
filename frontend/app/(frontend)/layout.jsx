'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import CartDrawer from '@/components/CartDrawer'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function FrontendLayout({ children }) {
    const pathname = usePathname()

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <CartDrawer />
            <main className="flex-grow">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-x-hidden"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
            <footer className="bg-medical-blue text-white py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <img src="/images/logos/logo-1.png" alt="Mar Logo" className="h-20 w-auto" />
                            </div>
                            <p className="text-blue-100/70 text-sm leading-relaxed mb-8">
                                Empowering people to live healthier, smokefree lives through innovative medical solutions and community support.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                            <ul className="space-y-4 text-blue-100/70 text-sm">
                                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                                <li><Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
                                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6">Resources</h4>
                            <ul className="space-y-4 text-blue-100/70 text-sm">
                                <li><Link href="/blogs" className="hover:text-white transition-colors">Health Blogs</Link></li>
                                <li><Link href="/about" className="hover:text-white transition-colors">Quit Guide</Link></li>
                                <li><Link href="/" className="hover:text-white transition-colors">Success Stories</Link></li>
                                <li><Link href="/support" className="hover:text-white transition-colors">FAQS</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6">Address</h4>
                            <div className="flex gap-3 mb-4">
                                <svg className="w-5 h-5 text-blue-100/70 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="text-blue-100/70 text-sm leading-relaxed">
                                    Maru Food Products,<br />
                                    3-135, Vakkalagadda Village,<br />
                                    Challapalli Mandal,<br />
                                    Krishna District,<br />
                                    Andhra Pradesh, 521126.
                                </p>
                            </div>
                            <div className="flex gap-3 mb-4">
                                <svg className="w-5 h-5 text-blue-100/70 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:marufood44@gmail.com" className="text-blue-100/70 text-sm hover:text-white transition-colors">
                                    marufood44@gmail.com
                                </a>
                            </div>
                            <div className="flex gap-3 mb-3">
                                <svg className="w-5 h-5 text-blue-100/70 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div className="text-blue-100/70 text-sm">
                                    <a href="tel:9971100999" className="hover:text-white transition-colors block">99711 00999</a>
                                    <a href="tel:9383899999" className="hover:text-white transition-colors block">93838 99999</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-100/40">
                        <p>© 2026 MAR Mouth Chill. All rights reserved.</p>
                        <div className="flex gap-8">
                            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                            <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
