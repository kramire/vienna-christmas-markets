import Router, { Route } from 'preact-router'
import { useState, useEffect } from 'preact/hooks'
import Home from './containers/home'
import ResultList from './containers/resultList'
import VisitProgress from './containers/visitProgress'
import data from './data/data.json'
import { Market, Event, ResultType, Coordinate } from './app.types'
import { FAVORITED_MARKETS_LOCAL_STORAGE_KEY } from './app.constants'
import useLocalStorage from './hooks/useLocalStorage'

const Pages = () => {
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

  return (
    <Router>
      <Route
        path="/markets"
        component={() => (
          <ResultList
            results={marketResults}
            favorites={favorites}
            setFavorites={setFavorites}
            deviceLocation={deviceLocation}
            setDeviceLocation={setDeviceLocation}
          />
        )}
      />
      <Route
        path="/events"
        component={() => (
          <ResultList
            results={eventResults}
            favorites={favorites}
            setFavorites={setFavorites}
            deviceLocation={deviceLocation}
            setDeviceLocation={setDeviceLocation}
          />
        )}
      />
      <Route
        path="/favorites"
        component={() => (
          <ResultList
            results={favoriteResults}
            favorites={favorites}
            setFavorites={setFavorites}
            deviceLocation={deviceLocation}
            setDeviceLocation={setDeviceLocation}
          />
        )}
      />
      <Route path="/visits" component={() => <VisitProgress markets={marketResults} />} />
      <Route path="/" component={Home} />
    </Router>
  )
}

export default Pages
