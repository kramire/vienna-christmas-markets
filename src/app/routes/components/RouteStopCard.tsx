import { notFound } from 'next/navigation'
import { Event, Market, StreetLights } from '../../../App.types'
import ResultsData from '../../../data.json'
import Image from 'next/image'
import RouteCardImage from './RouteCardImage'
import { resultToImgUrlMapping } from '../../../App.constants'

const LocationIcon = '/location.svg'

interface Props {
  stopId: number
  stopDescription: string
  nextDirections?: string
  idx: number
}

function RouteStopCard({ stopId, stopDescription, idx }: Props) {
  const stopResult = (ResultsData as Array<Market | Event | StreetLights>).find(({ id }) => id === stopId)

  if (!stopResult) {
    notFound()
  }

  const { id, name, district } = stopResult

  const imgSrc = resultToImgUrlMapping[id]

  return (
    <li className="flex w-full flex-shrink-0 flex-col overflow-hidden rounded-lg shadow-md md:flex-row">
      <div className="relative h-64 w-full md:h-auto md:w-1/3">
        <RouteCardImage imgSrc={imgSrc} altText={name} />
      </div>
      <div className="flex w-full flex-1 flex-col space-y-2 p-4 md:space-y-4">
        <h2 className="text-lg font-semibold text-green-950 sm:text-xl">{`${idx + 1}. ${name}`}</h2>
        <p className="text-sm">{stopDescription}</p>
        <dl className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Image src={LocationIcon} width={12} height={12} alt="" unoptimized />
            <dd>District</dd>
            <p>•</p>
            <dt>{district}</dt>
          </div>
        </dl>
      </div>
    </li>
  )
}

export default RouteStopCard
