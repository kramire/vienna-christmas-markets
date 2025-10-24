import { Routes } from '../../App.types'

interface MenuItem {
  name: string
  to: Routes
}

export const menuItems: Array<MenuItem> = [
  { name: 'Home', to: Routes.HOME },
  { name: 'Markets', to: Routes.MARKETS },
  { name: 'Pop-Ups', to: Routes.EVENTS },
  { name: 'Lights (New!)', to: Routes.LIGHTS },
  { name: 'Visits', to: Routes.VISITS },
]
