"use client"

import { BarChart3, Home, LogOut, MessageSquare, Settings, Users, Briefcase } from "lucide-react"
import Link from "next/link"

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    isActive: true,
  },
  {
    title: "Job Management",
    url: "#",
    icon: Briefcase,
  },
  {
    title: "Candidates",
    url: "#",
    icon: Users,
  },
  {
    title: "Messages",
    url: "#",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Analytics & Insights",
    url: "#",
    icon: BarChart3,
  },
]

export function Sidebar({ mobile = false }: { mobile?: boolean }) {
  return (
    <aside
      className={
        mobile
          ? "flex w-64 flex-col h-full border-r border-gray-200 bg-white"
          : "fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-gray-200 bg-white md:flex"
      }
    >
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">FELLOR</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
              item.isActive
                ? "bg-orange-50 text-orange-700 border-r-2 border-orange-500"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
          <LogOut className="h-5 w-5" />
          <span>Log-out</span>
        </Link>
      </div>
    </aside>
  )
}
