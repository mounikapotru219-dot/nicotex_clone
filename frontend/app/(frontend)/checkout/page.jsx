'use client'

import React, { useState } from 'react'
import { useCartStore } from '@/lib/store'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingBag, MapPin, CreditCard, ChevronRight, Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
    const { items, getCartTotal, clearCart } = useCartStore()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [orderId, setOrderId] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: ''
    })

    const router = useRouter()
    const total = getCartTotal()

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const orderData = {
                customer: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: `${formData.address}, ${formData.city} - ${formData.pincode}`
                },
                items: items.map(item => ({
                    productId: item._id,
                    quantity: item.quantity
                }))
            }

            const res = await api.post('/orders', orderData)
            setOrderId(res.data._id)
            setSuccess(true)
            clearCart()
        } catch (err) {
            console.error(err)
            alert('Failed to place order. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-medical-slate flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-12 rounded-3xl shadow-premium max-w-lg w-full text-center"
                >
                    <div className="w-20 h-20 bg-medical-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-medical-teal" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-medical-blue mb-4">Order Placed!</h1>
                    <p className="text-gray-600 mb-8">Thank you for your purchase. Your order ID is <span className="font-bold text-brand-600">#{orderId?.slice(-6).toUpperCase()}</span>. We've sent a confirmation email to {formData.email}.</p>
                    <button onClick={() => router.push('/')} className="btn-primary w-full py-4 text-lg">Continue Shopping</button>
                </motion.div>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                <h2 className="text-2xl font-bold text-medical-blue mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">You need to add items to your cart before checking out.</p>
                <Link href="/products" className="btn-primary px-8">Browse Products</Link>
            </div>
        )
    }

    return (
        <div className="bg-medical-slate min-h-screen py-12 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-medical-blue mb-12">Checkout</h1>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Step 1: Contact */}
                        <section className="bg-white p-8 rounded-3xl shadow-soft">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 font-bold">1</div>
                                <h2 className="text-2xl font-bold text-medical-blue">Contact Information</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="input-field" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="input-field" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="input-field" placeholder="+91 9876543210" />
                                </div>
                            </div>
                        </section>

                        {/* Step 2: Shipping */}
                        <section className="bg-white p-8 rounded-3xl shadow-soft">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 font-bold">2</div>
                                <h2 className="text-2xl font-bold text-medical-blue">Shipping Address</h2>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                                    <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className="input-field" placeholder="123 Wellness St, Apartment 4B" />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                                        <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="input-field" placeholder="Mumbai" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Pincode</label>
                                        <input type="text" name="pincode" required value={formData.pincode} onChange={handleInputChange} className="input-field" placeholder="400001" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Step 3: Payment */}
                        <section className="bg-white p-8 rounded-3xl shadow-soft">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 font-bold">3</div>
                                <h2 className="text-2xl font-bold text-medical-blue">Payment</h2>
                            </div>
                            <div className="p-6 border-2 border-brand-100 rounded-2xl bg-brand-50/30 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <CreditCard className="w-6 h-6 text-brand-600" />
                                    <span className="font-bold text-medical-blue">Cash on Delivery</span>
                                </div>
                                <CheckCircle className="w-6 h-6 text-brand-600" />
                            </div>
                            <p className="mt-4 text-sm text-gray-500">More payment options like UPI and Credit Cards will be available soon.</p>
                        </section>
                    </div>

                    {/* Sidebar Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl shadow-premium sticky top-24">
                            <h3 className="text-xl font-bold text-medical-blue mb-8">Order Summary</h3>
                            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2">
                                {items.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-white rounded-lg flex-shrink-0 border border-gray-100 overflow-hidden">
                                                <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2060&auto=format&fit=crop'} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-medical-blue line-clamp-1">{item.title}</p>
                                                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold text-medical-blue">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-bold">₹{total}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-medical-teal font-bold uppercase text-xs">Free</span>
                                </div>
                                <div className="flex justify-between text-2xl font-black text-medical-blue pt-4 border-t border-gray-100">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full mt-10 py-5 text-xl flex items-center justify-center gap-3 shadow-premium"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Complete Order <ChevronRight className="w-6 h-6" /></>}
                            </button>

                            <p className="text-[10px] text-center text-gray-400 mt-6 uppercase tracking-widest font-bold">Secure SSL Encrypted Checkout</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
