'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingCart, Plus } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { motion } from 'framer-motion'

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem)
  const [adding, setAdding] = React.useState(false)

  const handleAddToCart = async () => {
    setAdding(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    addItem(product)
    setAdding(false)
  }

  return (
    <motion.div
      className="bg-white rounded-3xl p-6 shadow-soft group border border-gray-100 flex flex-col h-full"
    >
      <Link href={`/products/${product._id}`} className="block relative aspect-square mb-6 overflow-hidden rounded-2xl bg-white border border-gray-50 p-4">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2060&auto=format&fit=crop'}
          alt={product.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-0 bg-blue-400 text-white text-[10px] font-black px-2 py-1 rounded-r-lg">
          TOP
        </div>
      </Link>

      <div className="flex-grow text-left">
        <h3 className="text-base font-black text-medical-blue mb-2 leading-snug group-hover:text-brand-600 transition-colors min-h-[3rem] line-clamp-2 break-words">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mb-6">
          <p className="text-xl font-black text-brand-900">
            ₹{product.price?.toLocaleString()}
          </p>
          <p className="text-xs font-black text-medical-teal uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-medical-teal animate-pulse" /> In Stock
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-auto">
        <Link
          href={`/products/${product._id}`}
          className="flex-1 flex items-center justify-center border-2 border-gray-100 text-gray-500 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-medical-blue hover:text-medical-blue transition-all"
        >
          View
        </Link>
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="flex-[1.5] bg-medical-blue text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-700 transition-all shadow-lg flex justify-center items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {adding ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Buy Now'
          )}
        </button>
      </div>
    </motion.div>
  )
}
