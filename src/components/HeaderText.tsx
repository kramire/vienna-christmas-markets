'use client'
import { usePathname } from 'next/navigation'
import { Routes } from '../App.types'

const HeaderText = () => {
  const pathname = usePathname()

  switch (pathname) {
    case Routes.MARKETS:
      return <h1 className="text-xl font-bold text-gray-800 sm:text-3xl md:text-4xl">Christmas Markets in Vienna</h1>
    case Routes.EVENTS:
      return <h1 className="text-xl font-bold text-gray-800 sm:text-3xl md:text-4xl">Christmas Pop-Ups in Vienna</h1>
    case Routes.LIGHTS:
      return <h1 className="text-xl font-bold text-gray-800 sm:text-3xl md:text-4xl">Christmas Lights in Vienna</h1>
    case Routes.ROUTES:
      return (
        <h1 className="text-xl font-bold text-gray-800 sm:text-3xl md:text-4xl">Christmas Walking Routes in Vienna</h1>
      )
    case Routes.HOME:
    case Routes.VISITS:
    default:
      return null
  }
}

export default HeaderText
