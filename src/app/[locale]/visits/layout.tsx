import { Metadata } from 'next'
import { HeaderText } from '../../components/HeaderText'
import { LayoutWrapper } from '../../components/LayoutWrapper'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  robots: {
    index: false,
  },
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('visitsPage')
  return (
    <LayoutWrapper>
      <HeaderText text={t('title')} />
      {children}
    </LayoutWrapper>
  )
}
