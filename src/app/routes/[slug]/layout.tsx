import { notFound } from 'next/navigation'
import data from '../data.json'
import { Route } from '../../../App.types'
import { Metadata } from 'next'

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
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
      images: ['/meta-christmas-mug.webp'],
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: ['/meta-christmas-mug.webp'],
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
