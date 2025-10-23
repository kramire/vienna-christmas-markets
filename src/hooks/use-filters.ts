import { FilterType } from '../App.types'
import { useState } from 'react'

function useFilters() {
  const [filters, setFilters] = useState<{
    [key in FilterType]: boolean
  }>({
    [FilterType.OPEN_NOW]: false,
    [FilterType.FAVORITE]: false,
    [FilterType.NEAR_ME]: false,
  })

  const toggleFilter = (filterKey: FilterType) => () => {
    setFilters({
      ...filters,
      [filterKey]: !filters[filterKey],
    })
  }

  const resetFilters = () => {
    setFilters({
      [FilterType.OPEN_NOW]: false,
      [FilterType.FAVORITE]: false,
      [FilterType.NEAR_ME]: false,
    })
  }

  return {
    filters,
    toggleFilter,
    resetFilters,
  }
}

export default useFilters
