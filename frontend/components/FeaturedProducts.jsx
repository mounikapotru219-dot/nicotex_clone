'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import api from '@/lib/api'

export default function FeaturedProducts() {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get('/products')
                // Get the first (and only) product
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

    if (loading) return (
        <div className="flex justify-center">
            <div className="w-full max-w-sm h-96 bg-gray-100 rounded-3xl animate-pulse"></div>
        </div>
    )

    if (!product) return (
        <div className="text-center py-12 text-gray-500">
            <p>No product available</p>
        </div>
    )

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-sm">
                <ProductCard product={product} />
            </div>
        </div>
    )
}
