'use client'

import Link from 'next/link'
import { menuItems } from './Header.constants'
import { usePathname } from 'next/navigation'
import { cn } from '../../utils/cn'
import { useTranslations } from 'next-intl'

const Header = () => {
  const t = useTranslations('navigation')
  const pathname = usePathname()
  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="flex gap-6 overflow-x-auto px-6 py-4 text-sm md:justify-center">
        {menuItems.map((item) => (
          <Link
            key={item.translationKey}
            href={item.to}
            className={cn(
              'shrink-0',
              pathname === item.to
                ? 'font-bold underline'
                : 'opacity-90 hover:underline sm:duration-300 sm:ease-in-out sm:hover:-translate-y-1',
            )}
          >
            {t(item.translationKey)}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header
