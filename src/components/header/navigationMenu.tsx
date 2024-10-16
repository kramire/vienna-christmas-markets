'use client'
import Image from 'next/image'

import { useState } from 'react'
import { menuItems } from './Header.constants'
import Link from 'next/link'

const MenuIcon = '/menu.svg'
const CloseIcon = '/close.svg'

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Image src={MenuIcon} width={24} height={24} onClick={toggleMenu} alt="Open navigation menu" />
      {isOpen && <div className="fixed inset-0 z-50 cursor-pointer bg-black bg-opacity-50" onClick={toggleMenu}></div>}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-4/5 transform bg-white transition-transform duration-300 ease-in-out sm:w-2/5 md:w-1/5 ${
          isOpen ? 'translate-x-0' : 'translate-x-[-100%]'
        }`}
      >
        <div className="flex w-full cursor-pointer justify-end p-6 pb-1">
          <Image src={CloseIcon} width={24} height={24} onClick={toggleMenu} alt="Close navigation menu" />
        </div>
        <ul className="z-1 sticky top-0 flex flex-col bg-white px-6">
          {menuItems.map((item) => (
            <li key={item.name} onClick={toggleMenu} className="p-2 hover:cursor-pointer">
              <Link href={item.to}>
                <p className="text-lg font-semibold">{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default NavigationMenu
