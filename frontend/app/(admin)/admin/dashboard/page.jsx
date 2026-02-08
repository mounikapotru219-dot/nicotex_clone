'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import api from '@/lib/api'
import { TrendingUp, TrendingDown, Package, ShoppingCart, IndianRupee, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const StatCard = ({ title, value, change, icon: Icon, trend, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-premium transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}%
        </div>
      )}
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-black text-medical-blue">{value}</p>
  </div>
)

const RecentOrder = ({ order }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">
        {order.user?.name?.charAt(0) || 'U'}
      </div>
      <div>
        <p className="font-bold text-medical-blue text-sm">{order.user?.name || 'Guest'}</p>
        <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-black text-medical-blue">₹{order.total}</p>
      <p className={`text-xs font-bold ${order.status === 'delivered' ? 'text-green-600' :
        order.status === 'pending' ? 'text-yellow-600' : 'text-blue-600'
        }`}>
        {order.status}
      </p>
    </div>
  </div>
)

export default function DashboardPage() {
  const [kpis, setKpis] = useState({ orders: 0, revenue: 0, productsSold: 0, products: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const productsRes = await api.get('/products')
        const products = productsRes.data || []

        let orders = []
        try {
          const ordersRes = await api.get('/orders')
          orders = ordersRes.data || []
        } catch (e) {
          orders = []
        }

        const totalOrders = orders.length
        const revenue = orders.reduce((s, o) => s + (o.total || 0), 0)
        const productsSold = orders.reduce((s, o) => s + (o.items || []).reduce((a, i) => a + i.quantity, 0), 0)

        setKpis({
          orders: totalOrders,
          revenue,
          productsSold,
          products: products.length
        })
        setRecentOrders(orders.slice(0, 5))
      } catch (err) {
        console.warn('Dashboard load failed', err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-medical-blue mb-2">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={`₹${kpis.revenue.toLocaleString()}`}
            change={12.5}
            trend="up"
            icon={IndianRupee}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            title="Total Orders"
            value={kpis.orders}
            change={8.2}
            trend="up"
            icon={ShoppingCart}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            title="Products Sold"
            value={kpis.productsSold}
            change={3.1}
            trend="down"
            icon={Package}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatCard
            title="Total Products"
            value={kpis.products}
            icon={Package}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-black text-medical-blue">Recent Orders</h2>
            <p className="text-sm text-gray-500 mt-1">Latest customer orders</p>
          </div>
          <div className="p-2">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <RecentOrder key={order._id} order={order} />
              ))
            ) : (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 font-medium">No orders yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-8 text-white">
            <h3 className="text-lg font-bold mb-2 opacity-90">Average Order Value</h3>
            <p className="text-4xl font-black mb-4">
              ₹{kpis.orders > 0 ? Math.round(kpis.revenue / kpis.orders) : 0}
            </p>
            <p className="text-sm opacity-75">Per transaction</p>
          </div>

          <div className="bg-gradient-to-br from-medical-teal to-brand-500 rounded-2xl p-8 text-white">
            <h3 className="text-lg font-bold mb-2 opacity-90">Conversion Rate</h3>
            <p className="text-4xl font-black mb-4">
              {kpis.products > 0 ? ((kpis.productsSold / kpis.products) * 100).toFixed(1) : 0}%
            </p>
            <p className="text-sm opacity-75">Products to sales ratio</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
