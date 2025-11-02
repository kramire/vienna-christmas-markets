import { Routes } from '../../App.types'

const ChristmasMugIcon = '/christmas-mug.png'
const ChristmasLightsIcon = '/christmas-lights.svg'
const OpenPresentIcon = '/open-gift.svg'
const GreenCheckMarkIcon = '/green-check-mark.svg'
const RouteIcon = '/route.svg'
const MapIcon = '/christmas-map.svg'
const MistletoeIcon = '/mistletoe.png'

interface MenuItem {
  name: string
  to: Routes
  icon: string
}

export const menuItems: Array<MenuItem> = [
  { name: 'Home', to: Routes.HOME, icon: MistletoeIcon },
  { name: 'Markets', to: Routes.MARKETS, icon: ChristmasMugIcon },
  { name: 'Pop-Ups', to: Routes.EVENTS, icon: OpenPresentIcon },
  { name: 'Lights (New!)', to: Routes.LIGHTS, icon: ChristmasLightsIcon },
  { name: 'Self-Guided Tours (New!)', to: Routes.ROUTES, icon: RouteIcon },
  { name: 'Map (New!)', to: Routes.MAP, icon: MapIcon },
  { name: 'Visits', to: Routes.VISITS, icon: GreenCheckMarkIcon },
]
