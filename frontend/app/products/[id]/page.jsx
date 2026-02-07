import React from 'react'

async function getProduct(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
      <label>
        Quantity:
        <input type="number" defaultValue={1} min={1} />
      </label>
      <div style={{ marginTop: 12 }}>
        <button>Add to cart</button>
      </div>
    </div>
  )
}
