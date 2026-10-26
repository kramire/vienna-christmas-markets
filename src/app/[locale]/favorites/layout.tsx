import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { HeaderText } from '../../components/HeaderText'
import { LayoutWrapper } from '../../components/LayoutWrapper'


export const metadata: Metadata = {
  robots: {
    index: false,
  },
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('favoritesPage')
  return (
    <LayoutWrapper>
      <HeaderText text={t('title')} />
      {children}
    </LayoutWrapper>
  )
}
