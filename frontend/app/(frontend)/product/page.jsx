'use client'

import React, { useEffect, useState } from 'react'
import { useCartStore } from '@/lib/store'
import api from '@/lib/api'
import { ShoppingCart, Check, Truck, RotateCcw, ShieldCheck, Star, Plus, Minus } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProductPage() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get('/products')
        if (res.data && res.data.length > 0) {
          setProduct(res.data[0])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [])

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-[600px] bg-gray-100 rounded-3xl animate-pulse"></div>
            <div className="space-y-6">
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
              <div className="h-8 bg-gray-100 rounded-xl animate-pulse w-1/2"></div>
              <div className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600">Product not found</h2>
        </div>
      </div>
    )
  }

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop']

  return (
    <div className="min-h-screen bg-white">
      {/* Product Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div 
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-brand-50 shadow-xl"
            >
              <img
                src={productImages[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all ${
                      selectedImage === idx ? 'border-brand-600 scale-95' : 'border-transparent hover:border-brand-200'
                    }`}
                  >
                    <img src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-medical-blue mb-4 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-500 font-medium">(250+ reviews)</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-black text-brand-600">₹{product.price}</span>
                <span className="text-gray-400 line-through text-2xl">₹{Math.round(product.price * 1.3)}</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                  Save {Math.round(((product.price * 1.3 - product.price) / (product.price * 1.3)) * 100)}%
                </span>
              </div>
            </div>

            <div className="border-t border-b border-gray-100 py-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-bold">In Stock ({product.stock} available)</span>
                </>
              ) : (
                <span className="text-red-600 font-bold">Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-4 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-8 py-4 font-black text-xl text-medical-blue">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="p-4 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-gray-500 text-sm">
                  Total: <span className="font-bold text-medical-blue text-lg">₹{product.price * quantity}</span>
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0 || addedToCart}
              className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-brand-600 text-white hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-6 h-6" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </>
              )}
            </motion.button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-brand-50 rounded-2xl">
                <Truck className="w-8 h-8 text-brand-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center p-4 bg-brand-50 rounded-2xl">
                <RotateCcw className="w-8 h-8 text-brand-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-600">Easy Returns</p>
              </div>
              <div className="text-center p-4 bg-brand-50 rounded-2xl">
                <ShieldCheck className="w-8 h-8 text-brand-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-600">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 border-t border-gray-100 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-medical-blue">Product Details</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-bold">Product Name</span>
                  <span>{product.title}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-bold">Price</span>
                  <span>₹{product.price}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-bold">Status</span>
                  <span className={product.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                    {product.status}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-bold">Availability</span>
                  <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-black text-medical-blue">Why Choose This Product?</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Clinically proven Nicotine Replacement Therapy (NRT)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Helps reduce tobacco cravings in just 5 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Recommended by 8 out of 10 doctors</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Safe and effective way to quit tobacco</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Convenient and discreet packaging</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mt-16 relative rounded-3xl overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#5B9FB5] to-[#4A8BA0]"></div>
          <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1505751172107-57325a3ec716?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center blur-sm"></div>
          
          <div className="relative z-10 p-8 lg:p-16">
            <h3 className="text-4xl lg:text-5xl font-black text-white mb-4 text-center tracking-wider">
              HOW USE
            </h3>
            <h3 className="text-4xl lg:text-5xl font-black text-white mb-16 text-center tracking-wider">
              MAR MOUTH CHILL
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Step 1 - PLACE */}
              <div className="bg-white/98 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center gap-4">
                  <h4 className="font-black text-2xl text-[#5B9FB5] mb-2">1. PLACE</h4>
                  <div className="w-32 h-32 mb-2 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Lips */}
                      <ellipse cx="100" cy="100" rx="50" ry="30" fill="#7BA8BA" opacity="0.7"/>
                      <ellipse cx="100" cy="95" rx="48" ry="25" fill="#8BB5C5"/>
                      <path d="M 60 95 Q 100 110 140 95" stroke="#6B98AA" strokeWidth="2" fill="none"/>
                      
                      {/* Hand with finger */}
                      <path d="M 140 80 Q 145 75 150 80 L 150 110 Q 145 115 140 110 Z" fill="#8BB5C5" opacity="0.8"/>
                      <ellipse cx="145" cy="75" rx="8" ry="10" fill="#9BC0CF"/>
                      
                      {/* Small pouch/patch */}
                      <rect x="135" y="85" width="12" height="8" rx="2" fill="white" stroke="#6B98AA" strokeWidth="1"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed font-medium">
                    Place one pouch<br />between your gum and lip.
                  </p>
                </div>
              </div>

              {/* Step 2 - LET IT WORK */}
              <div className="bg-white/98 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center gap-4">
                  <h4 className="font-black text-2xl text-[#5B9FB5] mb-2">2. LET IT WORK</h4>
                  <div className="w-32 h-32 mb-2 flex items-center justify-center relative">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Lips with pouch */}
                      <ellipse cx="100" cy="100" rx="50" ry="30" fill="#7BA8BA" opacity="0.7"/>
                      <ellipse cx="100" cy="95" rx="48" ry="25" fill="#8BB5C5"/>
                      <rect x="90" y="90" width="20" height="12" rx="2" fill="white" stroke="#6B98AA" strokeWidth="1"/>
                      
                      {/* Sparkles around */}
                      <circle cx="50" cy="60" r="3" fill="#5B9FB5"/>
                      <circle cx="150" cy="60" r="3" fill="#5B9FB5"/>
                      <circle cx="45" cy="130" r="3" fill="#5B9FB5"/>
                      <circle cx="155" cy="130" r="3" fill="#5B9FB5"/>
                      
                      {/* Star sparkles */}
                      <path d="M 60 70 L 62 75 L 67 75 L 63 78 L 65 83 L 60 80 L 55 83 L 57 78 L 53 75 L 58 75 Z" fill="#5B9FB5"/>
                      <path d="M 140 70 L 142 75 L 147 75 L 143 78 L 145 83 L 140 80 L 135 83 L 137 78 L 133 75 L 138 75 Z" fill="#5B9FB5"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed font-medium">
                    Feel the refreshing<br />sensation.
                  </p>
                </div>
              </div>

              {/* Step 3 - ENJOY */}
              <div className="bg-white/98 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center gap-4">
                  <h4 className="font-black text-2xl text-[#5B9FB5] mb-2">3. ENJOY</h4>
                  <div className="w-32 h-32 mb-2 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Smiley clock face */}
                      <circle cx="100" cy="100" r="50" fill="none" stroke="#5B9FB5" strokeWidth="6"/>
                      
                      {/* Eyes */}
                      <circle cx="85" cy="90" r="5" fill="#5B9FB5"/>
                      <circle cx="115" cy="90" r="5" fill="#5B9FB5"/>
                      
                      {/* Smile */}
                      <path d="M 75 110 Q 100 130 125 110" fill="none" stroke="#5B9FB5" strokeWidth="5" strokeLinecap="round"/>
                      
                      {/* Clock marks */}
                      <line x1="100" y1="55" x2="100" y2="65" stroke="#5B9FB5" strokeWidth="3"/>
                      <line x1="145" y1="100" x2="135" y2="100" stroke="#5B9FB5" strokeWidth="3"/>
                      <line x1="100" y1="145" x2="100" y2="135" stroke="#5B9FB5" strokeWidth="3"/>
                      <line x1="55" y1="100" x2="65" y2="100" stroke="#5B9FB5" strokeWidth="3"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed font-medium">
                    Keep to place<br />for up to up at<br />30 minutes.
                  </p>
                </div>
              </div>

              {/* Step 4 - DISPOSE */}
              <div className="bg-white/98 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center gap-4">
                  <h4 className="font-black text-2xl text-[#5B9FB5] mb-2">4. DISPOSE</h4>
                  <div className="w-32 h-32 mb-2 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Trash bin */}
                      <rect x="70" y="90" width="60" height="70" rx="4" fill="none" stroke="#5B9FB5" strokeWidth="5"/>
                      <line x1="60" y1="90" x2="140" y2="90" stroke="#5B9FB5" strokeWidth="5" strokeLinecap="round"/>
                      <path d="M 85 85 L 85 75 L 115 75 L 115 85" fill="none" stroke="#5B9FB5" strokeWidth="5"/>
                      
                      {/* Vertical lines on bin */}
                      <line x1="85" y1="100" x2="85" y2="145" stroke="#5B9FB5" strokeWidth="3"/>
                      <line x1="100" y1="100" x2="100" y2="145" stroke="#5B9FB5" strokeWidth="3"/>
                      <line x1="115" y1="100" x2="115" y2="145" stroke="#5B9FB5" strokeWidth="3"/>
                      
                      {/* Hand disposing */}
                      <path d="M 110 50 Q 120 45 125 55 L 115 70" fill="#8BB5C5" opacity="0.7"/>
                      <rect x="112" y="52" width="10" height="6" rx="2" fill="#9BC0CF"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed font-medium">
                    Dispose in used<br />pouch in a a<br />waste bin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
