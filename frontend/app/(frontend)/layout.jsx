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
            <main className="flex-grow overflow-x-hidden">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
            <footer className="bg-medical-blue text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-medical-blue font-bold text-xl">N</div>
                                <span className="text-2xl font-bold tracking-tight">Nicotex</span>
                            </div>
                            <p className="text-blue-100/70 text-sm leading-relaxed mb-8">
                                Empowering people to live healthier, smokefree lives through innovative medical solutions and community support.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-6">Products</h4>
                            <ul className="space-y-4 text-blue-100/70 text-sm">
                                <li><Link href="/products" className="hover:text-white transition-colors">Nicotine Gums</Link></li>
                                <li><Link href="/products" className="hover:text-white transition-colors">Nicotine Patches</Link></li>
                                <li><Link href="/products" className="hover:text-white transition-colors">Lozenges</Link></li>
                                <li><Link href="/products" className="hover:text-white transition-colors">Quit Kits</Link></li>
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
                            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
                            <p className="text-blue-100/70 text-sm mb-4">Stay updated with quit-smoking tips and offers.</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 w-full"
                                />
                                <button className="bg-white text-medical-blue px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-100/40">
                        <p>© 2026 Nicotex Medical Ltd. All rights reserved.</p>
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
