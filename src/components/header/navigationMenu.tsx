'use client'
import Image from 'next/image'

import { useState } from 'react'
import { menuItems } from './header.constants'
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
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 cursor-pointer" onClick={toggleMenu}></div>}
      <div
        className={`fixed left-0 top-0 h-full w-4/5 sm:w-2/5 md:w-1/5 bg-white z-50 transform transition-transform ease-in-out duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-[-100%]'
        }`}
      >
        <div className="flex justify-end w-full p-6 pb-1 cursor-pointer">
          <Image src={CloseIcon} width={24} height={24} onClick={toggleMenu} alt="Close navigation menu" />
        </div>
        <ul className="flex flex-col px-6 sticky top-0 z-1 bg-white">
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
