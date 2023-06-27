import { PageType } from '../../app.types'

interface MenuItem {
  name: string
  pageType: PageType
}

export const menuItems: Array<MenuItem> = [
  { name: 'Home', pageType: PageType.HOME },
  { name: 'Markets', pageType: PageType.MARKETS },
  { name: 'Events', pageType: PageType.EVENTS },
  { name: 'Favorites', pageType: PageType.FAVORITES },
  { name: 'Visits', pageType: PageType.VISITS },
]
