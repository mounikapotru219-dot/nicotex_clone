'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import api from '@/lib/api'
import Link from 'next/link'
import { Edit, Package, IndianRupee } from 'lucide-react'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const res = await api.get('/products')
      setProducts(res.data || [])
    } catch (e) {
      console.warn(e)
    }
    setLoading(false)
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-medical-blue mb-2">Product</h1>
            <p className="text-gray-500">Manage your product details</p>
          </div>
        </div>



        {/* Product Card */}
        {products.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-2xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <Package className="w-16 h-16 text-brand-600" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-black text-medical-blue mb-2">{products[0].title}</h2>
                  <p className="text-gray-600 mb-4">{products[0].description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Price</p>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4 text-gray-400" />
                        <span className="text-xl font-black text-brand-600">₹{products[0].price}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Stock</p>
                      <span className={`text-xl font-black ${products[0].stock > 10 ? 'text-green-600' : products[0].stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {products[0].stock}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${products[0].stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {products[0].stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Category</p>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-600">
                        {products[0].category || 'General'}
                      </span>
                    </div>
                  </div>

                  <Link href={`/admin/products/${products[0]._id}`}>
                    <button className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-premium flex items-center gap-2">
                      <Edit className="w-5 h-5" />
                      Edit Product
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 font-medium text-lg">No product available</p>
            <p className="text-gray-500 text-sm mt-2">Please add a product to get started</p>
          </div>
        )}


      </div>
    </AdminLayout>
  )
}
