'use client'
import getScript from './helpers/getScript'
import loadStyles from './helpers/loadStyles'
import { useEffect, useState } from 'react'
import { Coordinate, Event, Market, StreetLights } from '../../App.types'
import MapResultPopup from './components/MapResultPopup'

const WIEN_CENTER = { lat: 48.2089366, lng: 16.3625921 }

interface Props {
  results: Array<Market> | Array<Event> | Array<Market | Event | StreetLights> | Array<StreetLights>
  className: string
  center?: Coordinate
  zoom?: number
  popUpVariant?: 'card' | 'text'
  path?: Array<Coordinate>
}

const Map = ({ results, className, center = WIEN_CENTER, zoom = 13, popUpVariant = 'card', path }: Props) => {
  const [isCSSLoaded, setIsCSSLoaded] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [mapMarkerLayer, setMapMarkerLayer] = useState<any>(null)
  const [popupResult, setPopupResult] = useState<Market | Event | StreetLights | null>(null)

  const handleClosePopup = () => setPopupResult(null)

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
      const popUpMarker = window.L.circleMarker([result.coordinates.lat, result.coordinates.lng], {
        color: 'crimson',
        radius: 8,
        fill: true,
        fillColor: 'crimson',
        fillOpacity: 1,
      }).on('click', function () {
        setPopupResult(result)
      })

      //@ts-ignore
      const textMarker = window.L.circleMarker([result.coordinates.lat, result.coordinates.lng], {
        color: 'crimson',
        radius: 8,
        fill: true,
        fillColor: 'crimson',
        fillOpacity: 1,
      }).bindPopup(`${result.name}`)

      mapMarkerLayer.addLayer(popUpVariant === 'card' ? popUpMarker : textMarker)
    })

    // Draw a walking route path if provided
    if (path) {
      const coordinates = path.map((coord) => [coord.lat, coord.lng])
      //@ts-ignore
      window.L.polyline(coordinates, { color: 'crimson' }).addTo(map)

      // Show tooltip for stop number
      coordinates.forEach((coord, idx) => {
        const isEven = idx % 2 === 0
        //@ts-ignore
        window.L.tooltip(coord, {
          content: `${idx + 1}`,
          permanent: true,
          offset: isEven ? [8, 0] : [-8, 0],
          direction: isEven ? 'right' : 'left',
        }).addTo(map)
      })
    }

    map.addLayer(mapMarkerLayer)
  }, [mapMarkerLayer, results, path])

  if (!isCSSLoaded && !isScriptLoaded) {
    return null
  }

  return (
    <div className="relative">
      <div id="map" className={className} />
      {popupResult && <MapResultPopup result={popupResult} onClose={handleClosePopup} />}
    </div>
  )
}

export default Map
