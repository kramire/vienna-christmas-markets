import Image from 'next/image'
import React from 'react'
import { Event, Market } from '../../../App.types'
import LocationIcon from '../../../../public/location.svg'
import { GOOGLE_MAPS_LINK } from '../../../App.constants'
import Map from '../../../components/map'

interface Props {
  result: Market | Event
}

export const Location = ({ result }: Props) => {
  const { coordinates, district, address } = result

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
      <a href={googleMapsLink} target="_blank">
        <Map results={[result]} center={coordinates} zoom={14} className="z-0 h-40 w-full rounded-md shadow" />
      </a>
    </>
  )
}
