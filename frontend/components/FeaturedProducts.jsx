'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import api from '@/lib/api'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function FeaturedProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const ITEMS_PER_PAGE = 4

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

    useEffect(() => {
        if (products.length <= ITEMS_PER_PAGE) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [products.length])

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
    }

    // Get current slice of products with wrap-around
    const getVisibleProducts = () => {
        if (products.length <= ITEMS_PER_PAGE) return products

        const visible = []
        for (let i = 0; i < ITEMS_PER_PAGE; i++) {
            visible.push(products[(currentIndex + i) % products.length])
        }
        return visible
    }

    const currentProducts = getVisibleProducts()

    if (loading) return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-80 bg-gray-100 rounded-3xl animate-pulse"></div>
            ))}
        </div>
    )

    return (
        <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentProducts.map((product, idx) => (
                    <ProductCard key={`${product._id}-${idx}`} product={product} />
                ))}
            </div>

            {/* Carousel Controls */}
            {products.length > ITEMS_PER_PAGE && (
                <div className="mt-8 flex justify-center items-center gap-6">
                    <button
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-full border-2 border-medical-blue flex items-center justify-center text-medical-blue hover:bg-medical-blue hover:text-white transition-all shadow-md active:scale-95"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-10 h-10 rounded-full border-2 border-medical-blue flex items-center justify-center text-medical-blue hover:bg-medical-blue hover:text-white transition-all shadow-md active:scale-95"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    )
}
