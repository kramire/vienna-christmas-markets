import { Metadata } from 'next'

const META_TITLE = 'Vienna Christmas Lights - Updated 2025'
const META_DESCRIPTION = 'A list of Vienna streets featuring hanging Christmas lights.'

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
