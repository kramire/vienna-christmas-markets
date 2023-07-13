'use client'
import { usePathname } from 'next/navigation'
import { Routes } from '../app.types'

const HeaderText = () => {
  const pathname = usePathname()

  switch (pathname) {
    case Routes.MARKETS:
      return <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">Christmas Markets in Vienna</h1>
    case Routes.EVENTS:
      return <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">Christmas Events in Vienna</h1>
    case Routes.HOME:
    case Routes.VISITS:
    default:
      return null
  }
}

export default HeaderText
