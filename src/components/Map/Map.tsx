'use client'
import getScript from './helpers/getScript'
import loadStyles from './helpers/loadStyles'
import { useEffect, useState } from 'react'
import { Coordinate, Event, Market, StreetLights } from '../../App.types'
import MapResultPopup from './components/MapResultPopup'

const MugIcon = '/christmas-mug.png'
const LightsIcon = '/christmas-lights.svg'
const OpenPresentIcon = '/open-gift.svg'

const WIEN_CENTER = { lat: 48.2089366, lng: 16.3625921 }

interface Props {
  results: Array<Market> | Array<Event> | Array<Market | Event | StreetLights> | Array<StreetLights>
  className: string
  center?: Coordinate
  zoom?: number
  markerVariant?: 'card' | 'text'
  hasCustomIcons?: boolean
}

const Map = ({ results, className, center = WIEN_CENTER, zoom = 13, markerVariant, hasCustomIcons = false }: Props) => {
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

    // Add markers
    results.forEach((result) => {
      //@ts-ignore
      const customIcon = window.L.icon({
        iconUrl: result.type === 'MARKET' ? MugIcon : result.type === 'STREET_LIGHTS' ? LightsIcon : OpenPresentIcon,
        iconSize: [48, 48], // size of the icon
      })

      //@ts-ignore
      const basicMarker = window.L.marker(
        [result.coordinates.lat, result.coordinates.lng],
        hasCustomIcons ? { icon: customIcon } : {},
      )

      switch (markerVariant) {
        case 'card': {
          //@ts-ignore
          basicMarker.on('click', function () {
            setPopupResult(result)
          })
          mapMarkerLayer.addLayer(basicMarker)
          break
        }
        case 'text': {
          //@ts-ignore
          basicMarker.bindPopup(`${result.name}`)
          mapMarkerLayer.addLayer(basicMarker)
          break
        }
        default: {
          mapMarkerLayer.addLayer(basicMarker)
          break
        }
      }
    })

    map.addLayer(mapMarkerLayer)
  }, [mapMarkerLayer, results, markerVariant])

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
