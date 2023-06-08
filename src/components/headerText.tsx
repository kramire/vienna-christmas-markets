import { PageType } from '../app.types'

interface Props {
  page: PageType
}

const HeaderText = ({ page }: Props) => {
  switch (page) {
    case PageType.MARKETS:
      return <h1 class="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">Christmas Markets in Vienna</h1>
    case PageType.EVENTS:
      return <h1 class="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">Christmas Events in Vienna</h1>
    case PageType.FAVORITES:
      return <h1 class="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">Your Christmas Favorites</h1>
    case PageType.HOME:
    case PageType.MARKETS:
    default:
      return null
  }
}

export default HeaderText
