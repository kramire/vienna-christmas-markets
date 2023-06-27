import { useState } from 'preact/hooks'
import { PageType } from './app.types'
import Pages from './pages'
import Header from './components/header'

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
      <Header goToPage={goToPage} />
      <Pages page={page} goToPage={goToPage} />
    </div>
  )
}
