import { Routes } from '../../App.types'

interface MenuItem {
  name: string
  to: Routes
}

export const menuItems: Array<MenuItem> = [
  { name: 'Home', to: Routes.HOME },
  { name: 'Markets', to: Routes.MARKETS },
  { name: 'Events', to: Routes.EVENTS },
  { name: 'Visits', to: Routes.VISITS },
]
