'use client'

import Link from 'next/link'
import { menuItems } from './Header.constants'
import { usePathname } from 'next/navigation'
import { cn } from '../../utils/cn'

const Header = () => {
  const pathname = usePathname()
  return (
    <header className="w-full bg-white shadow">
      <nav className="flex gap-6 overflow-x-auto px-6 py-4 text-sm md:justify-center">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.to}
            className={cn(
              'flex-shrink-0',
              pathname === item.to
                ? 'font-bold underline'
                : 'opacity-90 hover:underline sm:duration-300 sm:ease-in-out sm:hover:-translate-y-1',
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header
