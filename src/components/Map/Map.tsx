'use client'

import getScript from './helpers/getScript'
import loadStyles from './helpers/loadStyles'
import { useEffect, useState } from 'react'
import { Coordinate, Event, Market } from '../../App.types'

const WIEN_CENTER = { lat: 48.2089366, lng: 16.3625921 }

interface Props {
  results: Array<Market> | Array<Event> | Array<Market | Event>
  className: string
  center?: Coordinate
  zoom?: number
}

const Map = ({ results, className, center = WIEN_CENTER, zoom = 13 }: Props) => {
  const [isCSSLoaded, setIsCSSLoaded] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [mapMarkerLayer, setMapMarkerLayer] = useState<any>(null)

  // Check if maps was loaded
  useEffect(() => {
    //@ts-ignore
    if (window?.L) {
      setIsCSSLoaded(true)
      setIsScriptLoaded(true)
    }
  }, [])

  // Load CSS - this must happen first
  useEffect(() => {
    if (isCSSLoaded) return
    loadStyles()
    setIsCSSLoaded(true)
  }, [])

  // Then load script
  useEffect(() => {
    if (!isCSSLoaded) return
    const script = getScript()
    document.getElementsByTagName('head')[0].appendChild(script)
    script.onload = () => setIsScriptLoaded(true)
  }, [isCSSLoaded])

  // Once script is loaded, initiate map
  useEffect(() => {
    if (!isScriptLoaded) return

    //@ts-ignore
    const map = window.L.map('map', {
      center: [center.lat, center.lng],
      zoom,
    })

    //@ts-ignore
    window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    setMap(map)
  }, [isScriptLoaded])

  // Once we have a map, initiate the layer for the markers
  useEffect(() => {
    if (map) {
      //@ts-ignore
      setMapMarkerLayer(window.L.layerGroup([]))
    }
  }, [map])

  // Clear any previous markers, and add the results as markers.
  useEffect(() => {
    if (!mapMarkerLayer) return

    mapMarkerLayer.clearLayers()

    results.forEach((result) => {
      //@ts-ignore
      const marker = window.L.marker([result.coordinates.lat, result.coordinates.lng]).bindPopup(
        `${result.id}. ${result.name}`,
      )

      mapMarkerLayer.addLayer(marker)
    })

    map.addLayer(mapMarkerLayer)
  }, [mapMarkerLayer, results])

  if (!isCSSLoaded && !isScriptLoaded) {
    return null
  }

  return <div id="map" className={className} />
}

export default Map
