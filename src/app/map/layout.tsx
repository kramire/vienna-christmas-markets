import { Metadata } from 'next'

const META_TITLE = 'Map of Vienna Christmas Activities - Updated 2025'
const META_DESCRIPTION = 'A map of all Christmas festivities nearby.'

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
