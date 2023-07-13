'use client'

import Image from 'next/image'

import { useState } from 'react'
import NavigationMenu from './navigationMenu'
import { HEADER_HEIGHT, MAX_CONTENT_WIDTH } from '../../app.constants'
import Link from 'next/link'
import { Routes } from '../../app.types'

const MenuIcon = '/menu.svg'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <header
        className="w-full py-2 px-6 z-10 bg-white fixed top-0"
        style={{
          boxShadow: '0 1px 2px rgba(0,0,0,.18)',
          height: `${HEADER_HEIGHT}px`,
        }}
      >
        <div
          className="flex justify-between items-center h-full"
          style={{ maxWidth: `${MAX_CONTENT_WIDTH}px`, margin: '0 auto' }}
        >
          <Image
            src={MenuIcon}
            width={24}
            height={24}
            onClick={toggleMenu}
            alt="Navigation menu"
            style={{
              width: '24px',
              height: '24px',
            }}
          />
          <Link href={Routes.HOME}>
            <p className="flex-1">Christmas in Vienna</p>
          </Link>
          <div />
        </div>
      </header>
      <NavigationMenu isOpen={isMenuOpen} handleClose={toggleMenu} />
    </>
  )
}

export default Header
