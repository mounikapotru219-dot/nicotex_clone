'use client'

import React from 'react'
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react'
import { useCartStore, useUIStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function CartDrawer() {
    const { isCartOpen, toggleCart } = useUIStore()
    const { items, removeItem, updateQuantity, getCartTotal } = useCartStore()

    const total = getCartTotal()

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
                    >
                        <div className="p-6 flex items-center justify-between border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6 text-brand-600" />
                                <h2 className="text-xl font-bold text-medical-blue">Your Cart</h2>
                                <span className="bg-brand-50 text-brand-600 text-xs font-bold px-2 py-1 rounded-full">{items.length} items</span>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mb-4">
                                        <ShoppingBag className="w-10 h-10 text-brand-200" />
                                    </div>
                                    <h3 className="text-lg font-bold text-medical-blue mb-2">Your cart is empty</h3>
                                    <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                                    <button onClick={toggleCart} className="btn-primary">Browse Products</button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item._id} className="flex gap-4">
                                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                                                <img
                                                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2060&auto=format&fit=crop'}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between mb-1">
                                                    <h4 className="font-bold text-medical-blue line-clamp-1">{item.title}</h4>
                                                    <button
                                                        onClick={() => removeItem(item._id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-500 mb-3">₹{item.price}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden">
                                                        <button
                                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                            className="px-2 py-1 hover:bg-gray-50 text-gray-400"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="px-3 py-1 text-sm font-bold min-w-[32px] text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                            className="px-2 py-1 hover:bg-gray-50 text-gray-400"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <span className="font-bold text-medical-blue">₹{item.price * item.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>₹{total}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-medical-teal font-medium">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-extrabold text-medical-blue pt-3 border-t border-gray-200">
                                        <span>Total</span>
                                        <span>₹{total}</span>
                                    </div>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={toggleCart}
                                    className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                                >
                                    Checkout Now <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
