import '../globals.css'
import Header from '../components/header'
import { HEADER_HEIGHT, MAX_CONTENT_WIDTH } from '../app.constants'
import { Metadata } from 'next'

const META_TITLE = 'Vienna Christmas Markets 2023'
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
      <body>
        <Header />
        <div style={{ maxWidth: `${MAX_CONTENT_WIDTH}px`, margin: '0 auto', marginTop: `${HEADER_HEIGHT}px` }}>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
