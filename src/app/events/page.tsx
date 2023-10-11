'use client'
import { useState, useEffect } from 'react'
import { Market, Event, ResultType, Coordinate } from '../../app.types'
import { FAVORITED_MARKETS_LOCAL_STORAGE_KEY } from '../../app.constants'
import ResultList from '../../containers/resultList'
import data from '../../data/data.json'
import useLocalStorage from '../../hooks/useLocalStorage'
import { Metadata } from 'next'

// const META_TITLE = 'Christmas Events - Vienna - 2022'
// const META_DESCRIPTION = 'Discover seasonal Christmas events and pop-ups in Vienna, Austria.'

// export const metadata: Metadata = {
//   title: META_TITLE,
//   description: META_DESCRIPTION,
//   openGraph: {
//     title: META_TITLE,
//     description: META_DESCRIPTION,
//     type: 'website',
//     images: ['/meta-christmas-mug.webp'],
//   },
//   twitter: {
//     title: META_TITLE,
//     description: META_DESCRIPTION,
//     card: 'summary_large_image',
//     images: ['/meta-christmas-mug.webp'],
//   },
// }

export default function EventsPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [deviceLocation, setDeviceLocation] = useState<Coordinate | undefined>(undefined)

  const { getItem } = useLocalStorage()

  const results: Array<Market | Event> = data
  const eventResults: Array<Event> = results.filter((result) => result.type === ResultType.EVENT && result.isActive)

  useEffect(() => {
    const storedFavoritedMarkets = getItem(FAVORITED_MARKETS_LOCAL_STORAGE_KEY)
    if (storedFavoritedMarkets) {
      setFavorites(JSON.parse(storedFavoritedMarkets))
    }
  }, [])

  return (
    <ResultList
      results={eventResults}
      favorites={favorites}
      setFavorites={setFavorites}
      deviceLocation={deviceLocation}
      setDeviceLocation={setDeviceLocation}
    />
  )
}
