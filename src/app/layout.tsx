import '../globals.css'
import Header from '../components/Header'
import { Metadata } from 'next'
import { MaxWidthContainer } from '../components/MaxWidthContainer'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
})

const META_TITLE = 'Vienna Christmas Markets 2025'
const META_DESCRIPTION = "A list of this year's Christmas markets in Vienna, Austria."

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  metadataBase: new URL('https://vienna-christmas-markets.netlify.app'),
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
      <body className="m-0 min-h-screen min-w-[320px] overflow-x-hidden">
        <Header />
        <main>
          <MaxWidthContainer>{children}</MaxWidthContainer>
        </main>
      </body>
    </html>
  )
}
