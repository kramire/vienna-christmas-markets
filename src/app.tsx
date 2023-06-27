import { useState } from 'preact/hooks'
import { PageType } from './app.types'
import Pages from './pages'
import Header from './components/header'
import { HEADER_HEIGHT, MAX_CONTENT_WIDTH } from './app.constants'

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
      <div style={{ maxWidth: `${MAX_CONTENT_WIDTH}px`, height: `calc(100% - ${HEADER_HEIGHT}px)`, margin: '0 auto' }}>
        <Pages page={page} goToPage={goToPage} />
      </div>
    </div>
  )
}
