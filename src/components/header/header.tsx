import NavigationMenu from './NavigationMenu'
import Link from 'next/link'
import { Routes } from '../../App.types'

const Header = () => (
  <header className="fixed top-0 z-20 h-[56px] w-full bg-white px-6 py-2 shadow-md">
    <div className="mx-auto my-0 flex h-full max-w-[1130px] cursor-pointer items-center justify-between">
      <NavigationMenu />
      <Link href={Routes.HOME}>
        <p className="flex-1">Christmas in Vienna</p>
      </Link>
      <div />
    </div>
  </header>
)

export default Header
