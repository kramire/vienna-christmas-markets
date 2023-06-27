import { useState } from 'preact/hooks'
import Menu from '../../assets/menu.svg'

import NavigationMenu from './navigationMenu'
import { PageType } from '../../app.types'

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
        class="flex justify-between items-center w-full h-14 py-2 px-6 sticky top-0 z-10 bg-white"
        style={{ boxShadow: '0 16px 64px -16px rgba(46,55,77,.24)' }}
      >
        <img src={Menu} width={24} height={16} onClick={toggleMenu} />
        <div onClick={() => goToPage(PageType.HOME)}>
          <p class="flex-1">Christmas in Vienna</p>
        </div>
        <div />
      </div>
      <NavigationMenu isOpen={isMenuOpen} handleClose={toggleMenu} goToPage={goToPage} />
    </>
  )
}

export default Header
