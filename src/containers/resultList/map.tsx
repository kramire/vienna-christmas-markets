import { useEffect, useState } from 'react'
import { Event, Market } from '../../app.types'

interface Props {
  results: Array<Market> | Array<Event> | Array<Market | Event>
}

const Map = ({ results }: Props) => {
  const [map, setMap] = useState<any>(null)
  const [mapMarkers, setMapMarkers] = useState<any>(null)

  useEffect(() => {
    const map = L.map('map', {
      center: [48.2089366, 16.3625921],
      zoom: 13,
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    setMap(map)
  }, [])

  useEffect(() => {
    if (!map && !mapMarkers) {
      setMapMarkers(L.layerGroup([]))
    }
  }, [map])

  useEffect(() => {
    if (!map && !mapMarkers) return

    mapMarkers.clearLayers()

    results.forEach((result) => {
      const marker = L.marker([result.coordinates.lat, result.coordinates.lng]).bindPopup(
        `${result.id}. ${result.name}`,
      )

      mapMarkers.addLayer(marker)
    })

    map.addLayer(mapMarkers)
  }, [map, mapMarkers, results])

  return <div id="map" style={{ height: 'calc(100vh - 200px)', zIndex: 1 }}></div>
}

export default Map
