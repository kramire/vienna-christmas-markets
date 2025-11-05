import Image from 'next/image'
import { Event, Market } from '../../../App.types'
import { GOOGLE_MAPS_LINK } from '../../../App.constants'
import Map from '../../../components/Map'

const LocationIcon = '/location.svg'
const TrainIcon = '/train.png'

interface Props {
  result: Market | Event
}

export const Location = ({ result }: Props) => {
  const { coordinates, district, address, transportation, website } = result

  const googleMapsLink = `${GOOGLE_MAPS_LINK}&query=${coordinates.lat},${coordinates.lng}`

  return (
    <>
      <h2 className="text-xl font-semibold text-green-950">Where to Go</h2>
      <div className="flex items-center gap-4">
        <Image src={LocationIcon} alt="" width={16} height={16} />
        <a href={googleMapsLink} className="underline" target="_blank">
          {district} - {address}
        </a>
      </div>
      {transportation.length > 0 && (
        <div className="flex items-center gap-4">
          <Image src={TrainIcon} alt="" width={16} height={16} />
          {transportation.join(' • ')}
        </div>
      )}
      <a href={googleMapsLink} target="_blank">
        <Map results={[result]} center={coordinates} zoom={14} className="z-0 h-40 w-full rounded-md shadow" />
      </a>
    </>
  )
}
