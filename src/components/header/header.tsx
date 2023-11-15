import NavigationMenu from './navigationMenu'
import Link from 'next/link'
import { Routes } from '../../app.types'

const Header = () => (
  <header className="w-full py-2 px-6 z-10 bg-white fixed top-0 h-[56px] shadow-md">
    <div className="flex justify-between items-center h-full cursor-pointer my-0 mx-auto max-w-[1130px]">
      <NavigationMenu />
      <Link href={Routes.HOME}>
        <p className="flex-1">Christmas in Vienna</p>
      </Link>
      <div />
    </div>
  </header>
)

export default Header
