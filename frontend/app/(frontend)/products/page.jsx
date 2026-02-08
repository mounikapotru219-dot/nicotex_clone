'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import api from '@/lib/api'
import { Filter, ChevronDown, Search } from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [sortBy, setSortBy] = useState('price-low') // Default sort

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products')
        setProducts(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products
    .filter(p => filter === 'All' ? true : p.category === filter)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
      return 0
    })

  const sortOptions = [
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Newest Arrivals', value: 'newest' }
  ]

  return (
    <div className="pb-24">
      {/* Banner Section */}
      <div className="relative h-[400px] w-full overflow-hidden mb-12">
        <div className="absolute inset-0 bg-medical-blue/60 z-10 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1579165466541-74e2beeac7df?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover"
          alt="Products Banner"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0 space-y-10">
            <div>
              <h3 className="font-bold text-lg text-medical-blue mb-6 border-b border-gray-100 pb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Category</p>
                  <div className="space-y-3">
                    {['All', 'Gums', 'Patches', 'Lozenges'].map((cat) => (
                      <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={filter === cat}
                          onChange={() => setFilter(cat)}
                          className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                        />
                        <span className={filter === cat ? "text-brand-600 font-bold" : "text-gray-600 group-hover:text-brand-600 transition-colors"}>
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Strength</p>
                  <div className="space-y-3">
                    {['2mg', '4mg', '7mg', '14mg', '21mg'].map((str) => (
                      <label key={str} className="flex items-center gap-3 text-gray-600">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                        <span>{str}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-premium rounded-2xl p-6 text-white text-center">
              <h4 className="font-bold mb-2">Need Help?</h4>
              <p className="text-xs text-blue-100 mb-4">Take our test to find the right strength for you.</p>
              <button className="w-full bg-white text-brand-600 py-2 rounded-lg font-bold text-sm">Start Test</button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-500 text-sm">Showing <span className="font-bold text-medical-blue">{filteredProducts.length}</span> results</p>
              <div className="relative group">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-100 px-6 py-2.5 pr-12 rounded-xl text-sm font-bold text-medical-blue focus:outline-none focus:border-brand-500 transition-all cursor-pointer shadow-soft"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.value === sortBy ? `Sort by: ${opt.label}` : opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-brand-600 transition-colors" />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 bg-white rounded-premium animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-premium shadow-soft">
                <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-medical-blue mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
