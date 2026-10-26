'use client'

import { useState, useEffect } from 'react'
import { FAVORITE_MARKETS_LOCAL_STORAGE_KEY } from '../App.constants'
import useLocalStorage from './use-local-storage'

const useFavorites = () => {
  const [favorites, setFavoritesState] = useState<number[]>([])
  const { getItem, setItem } = useLocalStorage()

  const setFavorites = (newFavorites: number[]) => {
    setFavoritesState(newFavorites)
    setItem(FAVORITE_MARKETS_LOCAL_STORAGE_KEY, newFavorites)
  }

  const getIsFavorite = (id: number) => favorites.includes(id)

  const toggleFavorite = (id: number) => () => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id]
    setFavorites(newFavorites)
  }

  useEffect(() => {
    const savedFavorites = getItem<Array<number>>(FAVORITE_MARKETS_LOCAL_STORAGE_KEY)
    setFavoritesState(savedFavorites || [])
  }, [])

  return {
    favorites,
    getIsFavorite,
    toggleFavorite,
    setFavorites,
  }
}

export default useFavorites
