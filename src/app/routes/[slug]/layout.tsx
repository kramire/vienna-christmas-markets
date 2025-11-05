import { notFound } from 'next/navigation'
import data from '../data.json'
import { Route } from '../../../App.types'
import { Metadata } from 'next'

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params

  const result = data.find((result) => result.slug === slug) as Route

  if (!result) {
    notFound()
  }

  const { name, description } = result

  const title = `Vienna Christmas Self-Guided Tour - ${name}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: ['/Vienna-City-Center-Christmas-Lights.webp'],
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: ['/Vienna-City-Center-Christmas-Lights.webp'],
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
