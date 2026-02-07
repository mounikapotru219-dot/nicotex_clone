'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../../../components/AdminLayout'
import { api } from '../../../../../lib/api'
import { useRouter } from 'next/navigation'

export default function EditProduct({ params }){
  const { id } = params
  const [product,setProduct]=useState(null)
  const [loading,setLoading]=useState(true)
  const router = useRouter()

  useEffect(()=>{ (async()=>{
    setLoading(true)
    try{ const p = await api('/api/products/'+id); setProduct(p) }catch(e){ alert('Load failed') }
    setLoading(false)
  })() }, [id])

  const save = async (e)=>{
    e.preventDefault()
    try{ await api('/api/products/'+id, { method: 'PUT', body: JSON.stringify(product) }); router.push('/admin/products') }catch(e){ alert(e.message) }
  }

  if(loading) return <AdminLayout><p>Loading...</p></AdminLayout>
  if(!product) return <AdminLayout><p>Not found</p></AdminLayout>

  return (
    <AdminLayout>
      <h2>Edit Product</h2>
      <form onSubmit={save} style={{ display:'grid', gap:8, maxWidth:640 }}>
        <input value={product.title} onChange={e=>setProduct({...product, title: e.target.value})} />
        <textarea value={product.description} onChange={e=>setProduct({...product, description: e.target.value})} />
        <input type="number" value={product.price} onChange={e=>setProduct({...product, price: Number(e.target.value)})} />
        <input type="number" value={product.stock} onChange={e=>setProduct({...product, stock: Number(e.target.value)})} />
        <div style={{ display:'flex', gap:8 }}>
          <button type="submit">Save</button>
          <button type="button" onClick={async()=>{ if(confirm('Delete?')){ await api('/api/products/'+id, { method: 'DELETE' }); router.push('/admin/products') } }}>Delete</button>
        </div>
      </form>
    </AdminLayout>
  )
}
