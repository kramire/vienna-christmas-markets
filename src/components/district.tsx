import Image from 'next/image'
import React from 'react'
import { Coordinate } from '../App.types'
import LocationIcon from '../../public/location.svg'
import { GOOGLE_MAPS_LINK } from '../App.constants'

interface Props {
  coordinates: Coordinate
  district: string
  isLinkedToMaps?: boolean
}

const District = ({ coordinates, district, isLinkedToMaps = false }: Props) => {
  if (isLinkedToMaps) {
    return (
      <div className="flex items-center gap-4">
        <Image src={LocationIcon} alt="" width={16} height={16} />
        <a
          href={`${GOOGLE_MAPS_LINK}&query=${coordinates.lat},${coordinates.lng}`}
          target="_blank"
          aria-label="Google maps link"
          className="underline"
        >
          {district}
        </a>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-4">
      <Image src={LocationIcon} alt="" width={16} height={16} />
      {district}
    </div>
  )
}

export default District
