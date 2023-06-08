import { PageType } from '../../app.types'
import House from '../../assets/house.svg'
import Market from '../../assets/store.svg'
import Mug from '../../assets/mug.svg'
import HeartSolid from '../../assets/heartSolid.svg'
import Tree from '../../assets/tree.svg'

export const footerItemMapping: {
  [key in PageType]: { name: string; iconSrc: string }
} = {
  HOME: {
    name: 'Home',
    iconSrc: House,
  },
  MARKETS: {
    name: 'Markets',
    iconSrc: Market,
  },
  EVENTS: {
    name: 'Events',
    iconSrc: Mug,
  },
  FAVORITES: {
    name: 'Favorites',
    iconSrc: HeartSolid,
  },
  VISITS: {
    name: 'Visits',
    iconSrc: Tree,
  },
}
