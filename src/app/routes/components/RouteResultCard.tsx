import { Route } from '../../../App.types'
import { resultToImgUrlMapping } from '../../../App.constants'

import Link from 'next/link'
import Image from 'next/image'
import CardImage from '../../../components/CardImage'

const LocationIcon = '/location.svg'
const CalendarIcon = '/calendar.svg'
const ClockIcon = '/clock.svg'

interface Props {
  result: Route
  resultIdx: number
}

const RouteResultCard = ({ result, resultIdx }: Props) => {
  const { id, name, district, distance, coverImgResultId, description, estimatedTime } = result

  const imgSrc = resultToImgUrlMapping[coverImgResultId]

  return (
    <li key={id} className="flex overflow-hidden rounded-lg shadow-md">
      <Link href={`/routes/${result.slug}`} className="flex w-full flex-col">
        <div className="relative h-64 w-full">
          <CardImage imgSrc={imgSrc} altText={name} imageLoading={resultIdx <= 2 ? 'eager' : 'lazy'} />
        </div>
        <div className="flex w-full flex-1 flex-col space-y-4 p-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-green-950 sm:text-xl">{`Route ${id}: ${name}`}</h2>
            <p className="text-sm italic">{description}</p>
          </div>
          <dl className="space-y-3 text-base sm:[&_dd]:font-semibold sm:[&_dt]:font-normal sm:[&_img]:row-span-2 sm:[&_img]:mt-1">
            <div className="flex grid-cols-[12px_1fr] items-center gap-2 sm:grid sm:items-start sm:gap-x-3 sm:gap-y-1">
              <Image src={LocationIcon} width={12} height={12} alt="" unoptimized />
              <dd>Districts</dd>
              <p className="sm:hidden">•</p>
              <dt>{district}</dt>
            </div>
            <div className="flex grid-cols-[12px_1fr] items-center gap-2 sm:grid sm:items-start sm:gap-x-3 sm:gap-y-1">
              <Image src={CalendarIcon} width={12} height={12} alt="" unoptimized />
              <dd>Distance</dd>
              <p className="sm:hidden">•</p>
              <dt>{distance}</dt>
            </div>
            <div className="flex grid-cols-[12px_1fr] items-center gap-2 sm:grid sm:items-start sm:gap-x-3 sm:gap-y-1">
              <Image src={ClockIcon} width={12} height={12} alt="" unoptimized />
              <dd>Estimated Time</dd>
              <p className="sm:hidden">•</p>
              <dt>{estimatedTime}</dt>
            </div>
          </dl>
        </div>
      </Link>
    </li>
  )
}

export default RouteResultCard
