import { getNavigatorLocation } from '../utils/get-navigator-location'
import { Coordinate } from '../App.types'
import { useState } from 'react'

function useDeviceLocation() {
  const [deviceLocation, setDeviceLocation] = useState<Coordinate | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const getDeviceLocation = async () => {
    try {
      setIsLoading(true)
      const result = await getNavigatorLocation()
      if (result) {
        setDeviceLocation(result)
        setIsLoading(false)
      }
    } catch {
      throw new Error('Could not get device location')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    deviceLocation,
    isLoading,
    getDeviceLocation,
  }
}

export default useDeviceLocation
