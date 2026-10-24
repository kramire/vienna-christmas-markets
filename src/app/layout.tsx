import '../globals.css'
import Header from '../components/Header'
import { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { CURRENT_YEAR, WEBSITE_URL } from '../App.constants'

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
})

const META_TITLE = `Vienna Christmas Markets ${CURRENT_YEAR}`
const META_DESCRIPTION = "A list of this year's Christmas markets in Vienna, Austria."

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  metadataBase: new URL(WEBSITE_URL),
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    type: 'website',
    images: ['/Vienna-City-Center-Christmas-Lights.webp'],
  },
  twitter: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    card: 'summary_large_image',
    images: ['/Vienna-City-Center-Christmas-Lights.webp'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="m-0 min-h-screen min-w-xs overflow-x-hidden">
        <Header />
        <main className="mx-auto my-0 max-w-6xl">
          {children}
        </main>
        <footer className="w-full bg-green-950 text-white flex flex-col gap-1 lg:gap-2 py-4 items-center">
          <p className="text-sm lg:text-base font-medium">Made with ❤️ by KK</p>
          <p className="text-[8px] lg:text-xs">All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
