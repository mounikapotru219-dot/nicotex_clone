'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import api from '@/lib/api'
import { useCartStore } from '@/lib/store'
import { Plus, Minus, ShieldCheck, Truck, RefreshCw, Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImg, setSelectedImg] = useState(0)
  const addItem = useCartStore((state) => state.addItem)
  const [adding, setAdding] = useState(false)

  const handleAddToCart = async () => {
    setAdding(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    addItem(product, quantity)
    setAdding(false)
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`)
        setProduct(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchProduct()
  }, [id])

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-12 animate-pulse">
      <div className="w-full md:w-1/2 h-[500px] bg-gray-100 rounded-3xl"></div>
      <div className="w-full md:w-1/2 space-y-6">
        <div className="h-4 w-24 bg-gray-100 rounded"></div>
        <div className="h-10 w-full bg-gray-100 rounded"></div>
        <div className="h-32 w-full bg-gray-100 rounded"></div>
      </div>
    </div>
  )

  if (!product) return <div className="text-center py-40">Product not found</div>

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Images */}
          <div className="space-y-6">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-soft">
              <img
                src={product.images?.[selectedImg] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2060&auto=format&fit=crop'}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${selectedImg === idx ? 'border-brand-500 scale-105' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-brand-50 text-brand-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {product.category || 'Gums'}
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold text-gray-700">4.8 (240 reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl font-extrabold text-medical-blue mb-4">{product.title}</h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex items-end gap-3 mb-10">
              <span className="text-4xl font-black text-medical-blue">₹{product.price}</span>
              {product.mrp && <span className="text-xl text-gray-400 line-through mb-1">₹{product.mrp}</span>}
              <span className="bg-medical-teal/10 text-medical-teal text-xs font-bold px-3 py-1 rounded-lg mb-1.5 ml-2">IN STOCK</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <div className="flex items-center justify-between bg-medical-slate px-6 py-4 rounded-full min-w-[160px]">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-brand-600">
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-bold text-lg text-medical-blue">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-brand-600">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="btn-primary flex-grow py-4 text-lg flex justify-center items-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {adding ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 p-6 bg-medical-slate rounded-2xl">
              <div className="text-center space-y-2">
                <ShieldCheck className="w-6 h-6 text-brand-600 mx-auto" />
                <p className="text-[10px] font-bold text-gray-400 uppercase">FDA Approved</p>
              </div>
              <div className="text-center space-y-2">
                <Truck className="w-6 h-6 text-brand-600 mx-auto" />
                <p className="text-[10px] font-bold text-gray-400 uppercase">Tracked Delivery</p>
              </div>
              <div className="text-center space-y-2">
                <RefreshCw className="w-6 h-6 text-brand-600 mx-auto" />
                <p className="text-[10px] font-bold text-gray-400 uppercase">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs / More info */}
        <div className="mt-24 border-t border-gray-100 pt-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-medical-blue mb-8">Clinical Information</h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Usage Directions</h3>
                <p className="text-gray-600">Use one gum every 1-2 hours for the first 6 weeks. Do not exceed 15 gums per day. Gradually reduce the frequency over the next 6 weeks as directed by your physician.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Potential Side Effects</h3>
                <p className="text-gray-600">Mild throat irritation, hiccups, or jaw muscle ache. These are usually temporary and decrease as you get used to the treatment.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Storage</h3>
                <p className="text-gray-600">Store in a cool, dry place away from direct sunlight and out of reach of children.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
