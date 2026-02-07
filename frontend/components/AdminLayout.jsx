'use client'

import React from 'react'
import Link from 'next/link'

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 240, padding: 16, background: '#0f172a', color: '#fff' }}>
        <h2 style={{ marginTop: 0 }}>Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link href="/admin/dashboard" style={{ color: '#fff' }}>Dashboard</Link>
          <Link href="/admin/products" style={{ color: '#fff' }}>Products</Link>
          <Link href="/admin/orders" style={{ color: '#fff' }}>Orders</Link>
        </nav>
      </aside>
      <div style={{ flex: 1, padding: 20 }}>{children}</div>
    </div>
  )
}
