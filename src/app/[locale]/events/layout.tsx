import { Metadata } from 'next'

import { CURRENT_YEAR } from '../../App.constants'
import { HeaderText } from '../../components/HeaderText'
import { LayoutWrapper } from '../../components/LayoutWrapper'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('popUpsPage')
  return {
    title: t('metaTitle', { currentYear: CURRENT_YEAR }),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle', { currentYear: CURRENT_YEAR }),
      description: t('metaDescription'),
      type: 'website',
      images: ['/Vienna-City-Center-Christmas-Lights.webp'],
    },
    twitter: {
      title: t('metaTitle', { currentYear: CURRENT_YEAR }),
      description: t('metaDescription'),
      card: 'summary_large_image',
      images: ['/Vienna-City-Center-Christmas-Lights.webp'],
    }
  }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('popUpsPage')
  return (
    <LayoutWrapper>
      <HeaderText text={t('title')} />
      {children}
    </LayoutWrapper>
  )
}
