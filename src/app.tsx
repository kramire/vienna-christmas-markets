import { useState } from 'preact/hooks'
import Footer from './components/footer/footer'
import { PageType } from './app.types'
import Pages from './pages'

export function App() {
  const [page, setPage] = useState<PageType>(PageType.HOME)

  const goToPage = (page: PageType) => setPage(page)

  return (
    <div
      style={{
        width: '100%',
        position: 'fixed',
        overflowY: 'scroll',
        inset: 0,
      }}
    >
      <Pages page={page} goToPage={goToPage} />
      <Footer page={page} goToPage={goToPage} />
    </div>
  )
}
