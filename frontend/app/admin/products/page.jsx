'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import { api } from '../../../lib/api'
import Link from 'next/link'

export default function AdminProductsPage(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ (async ()=>{
    setLoading(true)
    try{ const res = await api('/api/products'); setProducts(res || []) }catch(e){ console.warn(e) }
    setLoading(false)
  })() }, [])

  return (
    <AdminLayout>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h2>Products</h2>
        <Link href="/admin/products/new"><button>Add product</button></Link>
      </div>
      {loading ? <p>Loading...</p> : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:12 }}>
          {products.map(p=> (
            <div key={p._id} style={{ border:'1px solid #eee', padding:12, borderRadius:8 }}>
              <h3>{p.title}</h3>
              <p style={{ color:'#666' }}>{p.description}</p>
              <div style={{ display:'flex', gap:8 }}>
                <Link href={`/admin/products/${p._id}`}><button>View / Edit</button></Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
