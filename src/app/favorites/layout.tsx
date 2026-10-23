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
    <LayoutWrapper className="min-h-[calc(100vh-132px)]">
      <HeaderText text={HEADER_TEXT} />
      {children}
    </LayoutWrapper>
  )
}
