'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Package, IndianRupee, Hash, FileText, Tag, Image, Save } from 'lucide-react'
import Link from 'next/link'

export default function EditProduct({ params }) {
  const { id } = params
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    stock: 0,
    category: 'Gums',
    strength: '2mg',
    imageUrl: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    setLoading(true)
    try {
      const res = await api.get('/products/' + id)
      const product = res.data
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price || 0,
        stock: product.stock || 0,
        category: product.category || 'Gums',
        strength: product.strength || '2mg',
        imageUrl: product.imageUrl || ''
      })
    } catch (e) {
      console.error(e)
      alert('Failed to load product')
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await api.put('/products/' + id, formData)
      router.push('/admin/products')
    } catch (e) {
      console.error(e)
      alert('Save failed: ' + e.message)
      setSaving(false)
    }
  }



  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-medical-blue transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Products</span>
          </Link>
          <h1 className="text-3xl font-black text-medical-blue mb-2">Edit Product</h1>
          <p className="text-gray-500">Update product details and inventory</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Product Information Card */}
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100">
            <h2 className="text-xl font-black text-medical-blue mb-6 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Product Information
            </h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Product Title *
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Mar 2mg Mint Gum"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the product features and benefits..."
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Category and Strength */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="Gums">Gums</option>
                      <option value="Patches">Patches</option>
                      <option value="Lozenges">Lozenges</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Strength
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="strength"
                      value={formData.strength}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="2mg">2mg</option>
                      <option value="4mg">4mg</option>
                      <option value="7mg">7mg</option>
                      <option value="14mg">14mg</option>
                      <option value="21mg">21mg</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory Card */}
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100">
            <h2 className="text-xl font-black text-medical-blue mb-6 flex items-center gap-2">
              <IndianRupee className="w-5 h-5" />
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    required
                    min="0"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Image Card */}
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100">
            <h2 className="text-xl font-black text-medical-blue mb-6 flex items-center gap-2">
              <Image className="w-5 h-5" />
              Product Image
            </h2>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Image URL
              </label>
              <div className="relative">
                <Image className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Enter a valid image URL for the product</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-brand-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-premium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <Link href="/admin/products">
                <button
                  type="button"
                  className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </Link>
            </div>


          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
