import Image from 'next/image'

import { menuItems } from './header.constants'
import Link from 'next/link'

const CloseIcon = '/close.svg'

interface Props {
  isOpen: boolean
  handleClose: () => void
}

const NavigationMenu = ({ isOpen, handleClose }: Props) => (
  <>
    {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleClose}></div>}
    <div
      className="fixed left-0 top-0 h-full w-4/5 sm:w-2/5 md:w-1/5 bg-white z-50 transform transition-transform ease-in-out duration-300"
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 300ms ease-in-out' }}
    >
      <div className="flex justify-end w-full p-6 pb-1">
        <Image
          src={CloseIcon}
          width={24}
          height={24}
          onClick={handleClose}
          alt="Close navigation menu"
          style={{
            width: '24px',
            height: '24px',
          }}
        />
      </div>
      <ul className="flex flex-col px-6 sticky top-0 z-1 bg-white">
        {menuItems.map((item) => (
          <li key={item.name} onClick={handleClose} className="p-2 hover:cursor-pointer">
            <Link href={item.to}>
              <p className="text-lg font-semibold">{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </>
)

export default NavigationMenu
