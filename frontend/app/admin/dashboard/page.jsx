import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import { api } from '../../../lib/api'

export default function DashboardPage() {
  const [kpis, setKpis] = useState({ orders: 0, revenue: 0, productsSold: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const products = await api('/api/products')
        let orders = []
        try { orders = await api('/api/orders') } catch (e) { orders = [] }
        const totalOrders = orders.length
        const revenue = orders.reduce((s,o)=>s+(o.total||0),0)
        const productsSold = orders.reduce((s,o)=>s + (o.items||[]).reduce((a,i)=>a+i.quantity,0),0)
        setKpis({ orders: totalOrders, revenue, productsSold })
      } catch (err) {
        console.warn('Dashboard load failed', err.message)
      } finally { setLoading(false) }
    }
    load()
  }, [])

  return (
    <AdminLayout>
      <h2>Dashboard</h2>
      {loading ? <p>Loading...</p> : (
        <div style={{ display:'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }}>
          <div style={{ padding:12, borderRadius:8, background:'#fff', boxShadow:'0 1px 6px rgba(0,0,0,0.06)' }}>
            <h3>Total Orders</h3>
            <div style={{ fontSize:24 }}>{kpis.orders}</div>
          </div>
          <div style={{ padding:12, borderRadius:8, background:'#fff', boxShadow:'0 1px 6px rgba(0,0,0,0.06)' }}>
            <h3>Total Revenue</h3>
            <div style={{ fontSize:24 }}>₹{kpis.revenue}</div>
          </div>
          <div style={{ padding:12, borderRadius:8, background:'#fff', boxShadow:'0 1px 6px rgba(0,0,0,0.06)' }}>
            <h3>Products Sold</h3>
            <div style={{ fontSize:24 }}>{kpis.productsSold}</div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
