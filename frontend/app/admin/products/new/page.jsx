'use client'

import React, { useState } from 'react'
import AdminLayout from '../../../../../components/AdminLayout'
import { api } from '../../../../../lib/api'
import { useRouter } from 'next/navigation'

export default function NewProduct(){
  const [title,setTitle]=useState('')
  const [price,setPrice]=useState(0)
  const [stock,setStock]=useState(0)
  const [description,setDescription]=useState('')
  const router = useRouter()

  const submit = async (e) => {
    e.preventDefault()
    try{
      await api('/api/products', { method: 'POST', body: JSON.stringify({ title, price, stock, description }) })
      router.push('/admin/products')
    }catch(err){ alert('Create failed: '+err.message) }
  }

  return (
    <AdminLayout>
      <h2>New Product</h2>
      <form onSubmit={submit} style={{ display:'grid', gap:8, maxWidth:640 }}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={e=>setPrice(Number(e.target.value))} />
        <input type="number" placeholder="Stock" value={stock} onChange={e=>setStock(Number(e.target.value))} />
        <button type="submit">Create</button>
      </form>
    </AdminLayout>
  )
}
