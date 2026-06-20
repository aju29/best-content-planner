'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/', label: 'Dashboard' },
  { href: '/tasks', label: 'Tasks' },
  { href: '/videos', label: 'Videos' },
  { href: '/resources', label: 'Resources' },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <>
      {LINKS.map(({ href, label }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`font-medium transition-colors ${
              isActive
                ? 'text-gray-900 border-b-2 border-indigo-500 pb-0.5'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {label}
          </Link>
        )
      })}
    </>
  )
}
