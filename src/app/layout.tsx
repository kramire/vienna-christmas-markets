import '../globals.css'
import Header from '../components/header'
import { Metadata } from 'next'
import { MaxWidthContainer } from '../components/MaxWidthContainer'

const META_TITLE = 'Vienna Christmas Markets 2024'
const META_DESCRIPTION = "A list of this year's Christmas markets in Vienna, Austria."

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    type: 'website',
    images: ['/meta-christmas-mug.webp'],
  },
  twitter: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    card: 'summary_large_image',
    images: ['/meta-christmas-mug.webp'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="m-0 min-w-[320px] min-h-screen overflow-x-hidden">
        <Header />
        <main>
          <MaxWidthContainer>{children}</MaxWidthContainer>
        </main>
      </body>
    </html>
  )
}
