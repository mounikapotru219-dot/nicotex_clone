'use client'

import React from 'react'
import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingCart, LogOut, ChevronRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const NavItem = ({ href, icon: Icon, label }) => {
  const pathname = usePathname()
  const isActive = pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
        isActive
          ? "bg-brand-600 text-white shadow-premium"
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-500 group-hover:text-white")} />
        <span className="font-medium">{label}</span>
      </div>
      {isActive && <ChevronRight className="w-4 h-4 text-white/50" />}
    </Link>
  )
}

export default function AdminLayout({ children }) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-950 text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">N</div>
            <span className="text-xl font-bold tracking-tight">Nicotex Admin</span>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-6">
          <NavItem href="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem href="/admin/products" icon={Package} label="Products" />
          <NavItem href="/admin/orders" icon={ShoppingCart} label="Orders" />
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Admin</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-medical-blue font-bold tracking-wide uppercase text-[10px]">Portal</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-medical-blue">System Administrator</p>
              <p className="text-[10px] text-gray-400 uppercase font-black">Online</p>
            </div>
            <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  )
}
