import React from 'react'
import Link from 'next/link'

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/products`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id} style={{ marginBottom: 12 }}>
            <Link href={`/products/${p._id}`}>{p.title} — ₹{p.price}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
