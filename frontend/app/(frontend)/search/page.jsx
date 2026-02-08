'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import api from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import { Search, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function SearchContent() {
    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const search = async () => {
            setLoading(true)
            try {
                const res = await api.get('/products')
                const allProducts = res.data
                const filtered = allProducts.filter(p =>
                    p.title.toLowerCase().includes(query.toLowerCase()) ||
                    p.description.toLowerCase().includes(query.toLowerCase())
                )
                setProducts(filtered)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        if (query) search()
        else { setProducts([]); setLoading(false); }
    }, [query])

    return (
        <div className="bg-medical-slate min-h-screen pb-24">
            <div className="bg-white border-b border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-600 font-bold mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> All Products
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-brand-50 rounded-2xl text-brand-600">
                            <Search className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-medical-blue">Search results for "{query}"</h1>
                            <p className="text-gray-500 mt-1">Found {products.length} matching treatments</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                {loading ? (
                    <div className="flex justify-center py-24">
                        <Loader2 className="w-12 h-12 text-brand-400 animate-spin" />
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map(p => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-[2.5rem] shadow-premium">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Search className="w-10 h-10 text-gray-200" />
                        </div>
                        <h2 className="text-2xl font-bold text-medical-blue mb-4">No results found for your search</h2>
                        <p className="text-gray-500 max-w-sm mx-auto mb-8 font-medium">
                            We couldn't find any products matching your search terms. Try using broader keywords or explore our categories.
                        </p>
                        <Link href="/products" className="btn-primary inline-flex items-center gap-2 py-3 px-8">
                            Browse All Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading search...</div>}>
            <SearchContent />
        </Suspense>
    )
}
