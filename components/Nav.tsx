'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '/', label: 'Dashboard' },
  { href: '/tasks', label: 'Tasks' },
  { href: '/videos', label: 'Videos' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/resources', label: 'Resources' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href)
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <span className="text-gray-900 font-bold tracking-tight">Content Planner</span>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-medium transition-colors ${
                isActive(href)
                  ? 'text-gray-900 border-b-2 border-indigo-500 pb-0.5'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-6 py-3 flex flex-col gap-1">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`py-2.5 px-3 rounded-lg font-medium transition-colors ${
                isActive(href)
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
