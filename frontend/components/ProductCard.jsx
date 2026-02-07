import React from 'react'
import Link from 'next/link'

export default function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
      <h3 style={{ margin: '4px 0' }}><Link href={`/products/${product._id}`}>{product.title}</Link></h3>
      <p style={{ margin: '4px 0', color: '#555' }}>{product.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>₹{product.price}</strong>
        <small>{product.stock} in stock</small>
      </div>
    </div>
  )
}
