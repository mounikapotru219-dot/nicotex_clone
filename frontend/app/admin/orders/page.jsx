import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../../components/AdminLayout'
import { api } from '../../../../lib/api'

export default function OrdersPage(){
  const [orders,setOrders]=useState([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{ (async ()=>{
    setLoading(true)
    try{ const res = await api('/api/orders'); setOrders(res || []) }catch(e){ console.warn(e); setOrders([]) }
    setLoading(false)
  })() }, [])

  return (
    <AdminLayout>
      <h2>Orders</h2>
      {loading ? <p>Loading...</p> : (
        <div>
          {orders.map(o=> (
            <div key={o._id} style={{ border:'1px solid #eee', padding:12, marginBottom:8 }}>
              <div><strong>{o.customer?.name}</strong> — ₹{o.total}</div>
              <div>Status: {o.status}</div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
