import { Coordinate } from '../App.types'

const RADIANS = 6371 // Radius of the earth in km

export const getDistanceFromLatLonInKm = (c1: Coordinate, c2: Coordinate) => {
  const { lat: lat1, lng: lon1 } = c1
  const { lat: lat2, lng: lon2 } = c2

  const dLat = degreesToRadians(lat2 - lat1)
  const dLon = degreesToRadians(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = RADIANS * c // Distance in km

  return distance
}

const degreesToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180)
}
