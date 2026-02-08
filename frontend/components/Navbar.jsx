'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, X, Search, LogOut } from 'lucide-react'
import { useCartStore, useUIStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
    const cartItems = useCartStore((state) => state.items)
    const { toggleCart, isMobileMenuOpen, toggleMobileMenu } = useUIStore()
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const pathname = usePathname()

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    // Close mobile menu on route change
    useEffect(() => {
        if (isMobileMenuOpen) toggleMobileMenu()
        setIsSearchOpen(false)
    }, [pathname])

    const NAV_LINKS = [
        { label: 'Products', href: '/products' },
        { label: 'Blogs', href: '/blogs' },
        { label: 'About Us', href: '/about' },
        { label: 'Support', href: '/support' },
    ]

    const router = useRouter()

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setIsSearchOpen(false)
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
                            <div className="w-10 h-10 bg-gradient-premium rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-premium group-hover:rotate-6 transition-transform">N</div>
                            <span className="text-2xl font-bold tracking-tight text-medical-blue">Nicotex</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "nav-link relative py-2",
                                        pathname === link.href && "text-brand-600 font-bold"
                                    )}
                                >
                                    {link.label}
                                    {pathname === link.href && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600 rounded-full"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-2 md:gap-4">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 text-gray-400 hover:text-brand-600 transition-all active:scale-90"
                            >
                                <Search className="w-6 h-6" />
                            </button>

                            <div className="h-6 w-px bg-gray-200 hidden sm:block mx-1" />

                            <Link
                                href="/auth/login"
                                className={cn(
                                    "p-2 text-gray-400 hover:text-brand-600 transition-all active:scale-90",
                                    pathname.startsWith('/auth') && "text-brand-600"
                                )}
                            >
                                <User className="w-6 h-6" />
                            </Link>

                            <button
                                onClick={toggleCart}
                                className="p-2 text-gray-400 hover:text-brand-600 transition-all relative active:scale-90"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white animate-in zoom-in">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            <button
                                className="md:hidden p-2 text-gray-400 hover:text-brand-600 transition-all"
                                onClick={toggleMobileMenu}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Transitioning Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden fixed top-20 left-0 w-full bg-white border-b border-gray-100 z-40 overflow-hidden shadow-2xl"
                    >
                        <div className="flex flex-col gap-2 p-6">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-lg font-bold p-4 rounded-2xl transition-all",
                                        pathname === link.href ? "bg-brand-50 text-brand-600" : "text-gray-600 hover:bg-gray-50"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/admin/login"
                                className="mt-4 p-4 text-sm text-gray-400 font-bold uppercase tracking-widest border-t border-gray-50 flex items-center gap-2"
                            >
                                <X className="w-4 h-4" /> Admin Portal
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[60] bg-white flex flex-col p-6 lg:p-24"
                    >
                        <div className="max-w-4xl mx-auto w-full">
                            <div className="flex justify-between items-center mb-12">
                                <span className="text-2xl font-black text-medical-blue tracking-tight">Search Results</span>
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all active:scale-95"
                                >
                                    <X className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>

                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-brand-600" />
                                <input
                                    autoFocus
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                    placeholder="Search for products, blogs, or support..."
                                    className="w-full text-3xl lg:text-5xl font-bold border-b-4 border-gray-100 focus:border-brand-600 py-8 outline-none pl-20 transition-all placeholder:text-gray-200"
                                />
                            </div>

                            <div className="mt-12 text-gray-400 font-bold uppercase tracking-widest text-sm">
                                Popular Searches
                            </div>
                            <div className="flex flex-wrap gap-3 mt-6">
                                {['Nicotine Gum 2mg', 'Success Stories', 'How to quit', 'Withdrawal tips', 'Sugar-free'].map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => {
                                            setSearchQuery(tag)
                                            setIsSearchOpen(false)
                                            router.push(`/search?q=${encodeURIComponent(tag)}`)
                                        }}
                                        className="px-6 py-3 bg-gray-50 text-medical-blue font-bold rounded-full hover:bg-brand-50 hover:text-brand-600 transition-all"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
