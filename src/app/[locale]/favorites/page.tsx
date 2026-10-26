'use client'

import { Market, Event, StreetLights } from '../../App.types'
import data from '../../data.json'
import useFavorites from '../../hooks/use-favorites'
import Content from './content'


export default function FavoritesPage() {
  const {
    favorites,
    toggleFavorite,
  } = useFavorites()


  const results = data as Array<Market | Event | StreetLights>
  const savedFavorites = results.filter((result) => favorites.includes(result.id) && result.isActive)


  return <Content favorites={savedFavorites} toggleFavorite={toggleFavorite} />
}
