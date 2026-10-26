import { Routes } from '../../App.types'

const ChristmasMugIcon = '/christmas-mug.png'
const ChristmasLightsIcon = '/christmas-lights.svg'
const OpenPresentIcon = '/open-gift.svg'
const GreenCheckMarkIcon = '/green-check-mark.svg'
const RouteIcon = '/route.svg'
const MapIcon = '/christmas-map.svg'
const MistletoeIcon = '/mistletoe.png'
const HeartIcon = '/emptyHeart.svg'

interface MenuItem {
  translationKey: string
  to: Routes
  icon: string
}

export const menuItems: Array<MenuItem> = [
  { translationKey: 'home', to: Routes.HOME, icon: MistletoeIcon },
  { translationKey: 'markets', to: Routes.MARKETS, icon: ChristmasMugIcon },
  { translationKey: 'popUps', to: Routes.EVENTS, icon: OpenPresentIcon },
  { translationKey: 'lights', to: Routes.LIGHTS, icon: ChristmasLightsIcon },
  { translationKey: 'tours', to: Routes.ROUTES, icon: RouteIcon },
  { translationKey: 'map', to: Routes.MAP, icon: MapIcon },
  { translationKey: 'visits', to: Routes.VISITS, icon: GreenCheckMarkIcon },
  { translationKey: 'favorites', to: Routes.FAVORITES, icon: HeartIcon },
]
