import Pages from './pages'
import Header from './components/header'
import { HEADER_HEIGHT, MAX_CONTENT_WIDTH } from './app.constants'

export function App() {
  return (
    <div
      style={{
        width: '100%',
        position: 'fixed',
        overflowX: 'hidden',
        overflowY: 'scroll',
        inset: 0,
      }}
    >
      <Header />
      <div style={{ maxWidth: `${MAX_CONTENT_WIDTH}px`, margin: '0 auto' }}>
        <Pages />
      </div>
    </div>
  )
}
