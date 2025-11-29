'use client'

import Image from 'next/image'
import { menuItems } from '../components/Header/Header.constants'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function GlobalError() {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <html>
      <body className="mx-auto flex h-[100dvh] w-full flex-col items-center justify-center gap-4 md:w-1/2">
        <h1 className="text-xl font-semibold lg:text-3xl">Something went wrong!</h1>
        <p className="text-base">Try another page:</p>
        <div className="flex flex-col gap-3">
          {menuItems.map(({ name, to, icon }) => {
            if (pathname === to) return
            return (
              <Link
                href={to}
                key={to}
                className="flex flex-1 items-center gap-4 rounded border border-green-950 px-3 py-2"
              >
                <Image src={icon} width={20} height={20} alt="" className="h-5 w-5" unoptimized />
                <h2 className="text-base font-medium">{name}</h2>
              </Link>
            )
          })}
        </div>
      </body>
    </html>
  )
}
