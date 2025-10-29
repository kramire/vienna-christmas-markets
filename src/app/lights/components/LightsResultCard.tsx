import { StreetLights } from '../../../App.types'
import CardImage from '../../../components/CardImage'
import Image from 'next/image'
import { GOOGLE_MAPS_LINK, resultToImgUrlMapping } from '../../../App.constants'

const LocationIcon = '/location.svg'

interface Props {
  result: StreetLights
}

function LightsResultCard({ result }: Props) {
  const { id, name, district, coordinates, locationType } = result

  const imgSrc = resultToImgUrlMapping[id]

  const googleMapsLink = `${GOOGLE_MAPS_LINK}&query=${coordinates.lat},${coordinates.lng}`

  return (
    <li key={id} className="flex w-full flex-col overflow-hidden rounded-lg shadow-md">
      <div className="relative h-64 w-full">
        <CardImage imgSrc={imgSrc} altText={name} />
      </div>
      <div className="flex w-full flex-1 flex-col justify-between space-y-4 p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-green-950">{name}</h2>
          <p className="text-sm">{`(${locationType === 'STREET' ? 'Street' : 'Square'})`}</p>
        </div>
        <dl className="space-y-3 text-base sm:[&_dt]:font-normal sm:[&_img]:row-span-2 sm:[&_img]:mt-1">
          <div className="flex items-center gap-2">
            <Image src={LocationIcon} width={12} height={12} alt="" />
            <dd>District</dd>
            <p>•</p>
            <dt>
              <a href={googleMapsLink} className="underline" target="_blank">
                {district}
              </a>
            </dt>
          </div>
        </dl>
      </div>
    </li>
  )
}

export default LightsResultCard
