'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Navigation() {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/demo', label: 'Demo' },
    { href: '/pricing', label: 'Pricing' },
  ]
  
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/logoIcon.png"
          alt="StageWize Logo"
          width={24}
          height={24}
          className="h-6 w-6"
        />
        <span className="text-white font-bold text-lg">StageWize</span>
      </Link>
      
      <nav className="flex gap-6 text-sm text-zinc-300">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`hover:text-white transition-colors ${
              pathname === item.href
                ? 'text-white font-medium'
                : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
} 