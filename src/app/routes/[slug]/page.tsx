import { notFound } from 'next/navigation'
import { Market, Event, Route, StreetLights, ResultType } from '../../../App.types'
import RouteData from '../data.json'
import ResultsData from '../../../data.json'
import RouteStopCard from '../components/RouteStopCard'
import Map from '../../../components/Map'
import Link from 'next/link'

export default function WalkingRoutesPage({ params }: { params: { slug: string } }) {
  const result = (RouteData as Array<Route>).find((route) => route.slug === params.slug)

  if (!result) {
    notFound()
  }

  const { id, name, description, stops, mapZoom } = result

  const resultsForMap = ResultsData.filter((id) => stops.some((stop) => stop.id === id.id)) as Array<
    Market | Event | StreetLights
  >

  const firstStop = stops.find((stop) => stop.order === 1)
  const firstStopCoordinates = resultsForMap.find((result) => result.id === firstStop?.id)?.coordinates

  return (
    <div className="m-auto flex w-full flex-col gap-4 p-4 md:h-[calc(100vh-52px)] lg:gap-6 lg:py-6">
      <div className="flex flex-col gap-1 md:gap-3">
        <h1 className="text-xl font-bold text-green-950 sm:text-3xl md:text-4xl">{`Route ${id}: ${name}`}</h1>
        <p className="text-sm md:text-base">{description}</p>
        <a href="#map" className="text-right text-sm font-medium text-green-950 underline md:hidden">
          Scroll to map
        </a>
      </div>
      <div className="flex w-full flex-col gap-3 md:h-[calc(100%-80px)] md:flex-row md:[&>div]:flex-1">
        <ul className="flex h-full w-full flex-col gap-4 md:-mx-1 md:w-[60%] md:overflow-y-auto md:px-1">
          {stops
            .sort((a, b) => a.order - b.order)
            .map((result, idx) => {
              const { id, description, type } = result
              if (type === ResultType.MARKET || type === ResultType.EVENT) {
                const result = resultsForMap.find((res) => res.id === id) as Market | Event
                return (
                  <Link key={id} href={`/${result.slug}`}>
                    <RouteStopCard stopId={id} stopDescription={description} idx={idx} />
                  </Link>
                )
              }
              return <RouteStopCard key={id} stopId={id} stopDescription={description} idx={idx} />
            })}
        </ul>
        <Map
          results={resultsForMap}
          className="z-10 h-96 w-full md:h-full"
          zoom={mapZoom}
          center={firstStopCoordinates}
          markerVariant="text"
        />
      </div>
    </div>
  )
}
