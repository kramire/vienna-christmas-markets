'use client'

import Image from 'next/image'
import { menuItems } from '../components/Header/Header.constants'
import Link from 'next/link'

export default function GlobalError() {
  return (
    <html>
      <body className="mx-auto flex h-screen w-full flex-col items-center justify-center gap-4 md:w-1/2">
        <h1 className="text-xl font-semibold lg:text-3xl">Something went wrong!</h1>
        <p className="text-base">Try another page:</p>
        <div className="flex flex-col gap-3">
          {menuItems.map(({ name, to, icon }) => (
            <Link
              href={to}
              key={to}
              className="flex flex-1 items-center gap-4 rounded border border-green-950 px-3 py-2"
            >
              <Image src={icon} width={20} height={20} alt="" />
              <h2 className="text-base font-medium">{name}</h2>
            </Link>
          ))}
        </div>
      </body>
    </html>
  )
}
