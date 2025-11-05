import { Metadata } from 'next'

const META_TITLE = 'Vienna Christmas Markets - Updated 2025'
const META_DESCRIPTION =
  "Discover over 15 seasonal markets this year in Vienna. Read about each market's offerings, opening hours, location."

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
