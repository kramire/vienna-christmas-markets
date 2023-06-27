import { useState } from 'preact/hooks'
import Menu from '../../assets/menu.svg'

import NavigationMenu from './navigationMenu'
import { PageType } from '../../app.types'
import { HEADER_HEIGHT, MAX_CONTENT_WIDTH } from '../../app.constants'

interface Props {
  goToPage: (page: PageType) => void
}

const Header = ({ goToPage }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <div
        class="w-full py-2 px-6 sticky top-0 z-10 bg-white"
        style={{
          boxShadow: '0 1px 2px rgba(0,0,0,.18)',
          height: `${HEADER_HEIGHT}px`,
        }}
      >
        <div
          class="flex justify-between items-center h-full"
          style={{ maxWidth: `${MAX_CONTENT_WIDTH}px`, margin: '0 auto' }}
        >
          <img src={Menu} width={24} height={16} onClick={toggleMenu} />
          <div onClick={() => goToPage(PageType.HOME)}>
            <p class="flex-1">Christmas in Vienna</p>
          </div>
          <div />
        </div>
      </div>
      <NavigationMenu isOpen={isMenuOpen} handleClose={toggleMenu} goToPage={goToPage} />
    </>
  )
}

export default Header
