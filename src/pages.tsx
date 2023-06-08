import { useState, useEffect } from 'preact/hooks'
import Home from './containers/home'
import ResultList from './containers/resultList'
import VisitProgress from './containers/visitProgress'
import data from './data/data.json'
import { Market, Event, PageType, ResultType, Coordinate } from './app.types'
import { FAVORITED_MARKETS_LOCAL_STORAGE_KEY } from './app.constants'
import useLocalStorage from './hooks/useLocalStorage'

interface Props {
  page: PageType
  goToPage: (page: PageType) => void
}

const Pages = ({ page, goToPage }: Props) => {
  const [favorites, setFavorites] = useState<number[]>([])
  const [deviceLocation, setDeviceLocation] = useState<Coordinate | undefined>(undefined)

  const { getItem } = useLocalStorage()

  const results: Array<Market | Event> = data

  const marketResults: Array<Market> = results.filter((result) => result.type === ResultType.MARKET)
  const eventResults: Array<Event> = results.filter((result) => result.type === ResultType.EVENT)
  const favoriteResults: Array<Market | Event> = results.filter((result) => favorites.includes(result.id))

  useEffect(() => {
    const storedFavoritedMarkets = getItem(FAVORITED_MARKETS_LOCAL_STORAGE_KEY)
    if (storedFavoritedMarkets) {
      setFavorites(JSON.parse(storedFavoritedMarkets))
    }
  }, [])

  switch (page) {
    case PageType.HOME:
      return <Home goToPage={goToPage} />
    case PageType.MARKETS:
      return (
        <ResultList
          results={marketResults}
          page={PageType.MARKETS}
          favorites={favorites}
          setFavorites={setFavorites}
          deviceLocation={deviceLocation}
          setDeviceLocation={setDeviceLocation}
        />
      )
    case PageType.EVENTS:
      return (
        <ResultList
          results={eventResults}
          page={PageType.EVENTS}
          favorites={favorites}
          setFavorites={setFavorites}
          deviceLocation={deviceLocation}
          setDeviceLocation={setDeviceLocation}
        />
      )
    case PageType.FAVORITES:
      return (
        <ResultList
          results={favoriteResults}
          page={PageType.FAVORITES}
          favorites={favorites}
          setFavorites={setFavorites}
          deviceLocation={deviceLocation}
          setDeviceLocation={setDeviceLocation}
        />
      )
    case PageType.VISITS:
      return <VisitProgress markets={marketResults} />
    default:
      return null
  }
}

export default Pages
