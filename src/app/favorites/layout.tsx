import { Metadata } from 'next'
import { HeaderText } from '../../components/HeaderText'
import { LayoutWrapper } from '../../components/LayoutWrapper'

const HEADER_TEXT = 'Your Favorites'

export const metadata: Metadata = {
  robots: {
    index: false,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutWrapper>
      <HeaderText text={HEADER_TEXT} />
      {children}
    </LayoutWrapper>
  )
}
