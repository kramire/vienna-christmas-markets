import { notFound } from 'next/navigation'
import data from '../../data.json'
import { Event, Market, ResultType } from '../../App.types'
import { Metadata } from 'next'

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const result = data.find((result) => result.slug === slug) as Market | Event

  if (!result) {
    notFound()
  }

  const { name, type } = result

  const title = type === ResultType.MARKET ? `Vienna Christmas Markets - ${name}` : `Vienna Christmas Pop-Ups - ${name}`

  return {
    title,
    openGraph: {
      title,
      type: 'website',
      images: ['/meta-christmas-mug.webp'],
    },
    twitter: {
      title,
      card: 'summary_large_image',
      images: ['/meta-christmas-mug.webp'],
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
