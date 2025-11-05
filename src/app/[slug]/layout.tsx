import { notFound } from 'next/navigation'
import data from '../../data.json'
import { Event, Market, ResultType } from '../../App.types'
import { Metadata } from 'next'

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params

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
      images: ['/Vienna-City-Center-Christmas-Lights.webp'],
    },
    twitter: {
      title,
      card: 'summary_large_image',
      images: ['/Vienna-City-Center-Christmas-Lights.webp'],
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
