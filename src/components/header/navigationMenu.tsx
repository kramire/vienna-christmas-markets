import Close from '../../assets/close.svg'
import { menuItems } from './header.constants'
import { Link } from 'preact-router/match'

interface Props {
  isOpen: boolean
  handleClose: () => void
}

const NavigationMenu = ({ isOpen, handleClose }: Props) => (
  <>
    {isOpen && <div class="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleClose}></div>}
    <div
      class="fixed left-0 top-0 h-full w-4/5 sm:w-2/5 md:w-1/5 bg-white z-50 transform transition-transform ease-in-out duration-300"
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 300ms ease-in-out' }}
    >
      <div class="flex justify-end w-full p-6 pb-1">
        <img src={Close} width={24} height={16} onClick={handleClose} />
      </div>
      <ul class="flex flex-col px-6 sticky top-0 z-1 bg-white">
        {menuItems.map((item) => (
          <Link href={item.to}>
            <li key={item.name} onClick={handleClose} class="p-2 hover:cursor-pointer">
              <p class="text-lg font-semibold">{item.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  </>
)

export default NavigationMenu
