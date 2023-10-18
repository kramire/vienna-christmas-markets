'use client'

import getScript from '../../components/map/helpers/getScript'
import loadStyles from '../../components/map/helpers/loadStyles'
import { useEffect, useState } from 'react'
import { Event, Market } from '../../app.types'

interface Props {
  results: Array<Market> | Array<Event> | Array<Market | Event>
}

const Map = ({ results }: Props) => {
  const [isCSSLoaded, setIsCSSLoaded] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [mapMarkerLayer, setMapMarkerLayer] = useState<any>(null)

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
      center: [48.2089366, 16.3625921],
      zoom: 13,
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

  return <div id="map" className="h-[65vh] z-10 w-screen md:w-full -translate-x-6 md:translate-x-0" />
}

export default Map
