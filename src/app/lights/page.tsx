import { StreetLights } from '../../App.types'
import sortResultsByDistrict from '../../utils/sort-results-by-district'
import CardImage from '../../components/CardImage'
import Image from 'next/image'
import { resultToImgUrlMapping } from './Lights.constants'
import HeaderText from '@/components/HeaderText'
import data from './lights-data.json'
import ResultsListWrapper from '../../components/ResultsWrapper'
import { GOOGLE_MAPS_LINK } from '@/App.constants'

const LocationIcon = '/location.svg'

export default function LightsPage() {
  const results = (data as Array<StreetLights>).filter((result) => result.isActive).sort(sortResultsByDistrict)
  const resultCount = results.length
  return (
    <div className="m-auto flex h-full w-full flex-col gap-3 p-4 md:gap-6">
      <div className="flex flex-col gap-1 md:gap-3">
        <HeaderText />
        <p className="text-sm md:text-base">
          {resultCount} {resultCount === 1 ? 'result' : 'results'} found
        </p>
        <ResultsListWrapper>
          {results.map((result) => {
            const { id, name, district, coordinates } = result
            const imgSrc = resultToImgUrlMapping[id]
            const googleMapsLink = `${GOOGLE_MAPS_LINK}&query=${coordinates.lat},${coordinates.lng}`
            return (
              <li key={id} className="flex w-full flex-col gap-3 overflow-hidden rounded-lg shadow-md">
                <div className="relative h-64 w-full">
                  <CardImage imgSrc={imgSrc} altText={name} />
                </div>
                <div className="flex w-full flex-1 flex-col justify-between space-y-4 px-4 py-6">
                  <h2 className="text-xl font-semibold text-green-950">{name}</h2>
                  <dl className="space-y-4 [&>div]:grid [&>div]:grid-cols-[12px_1fr] [&>div]:gap-x-4 [&_dd]:text-sm [&_dd]:font-semibold [&_img]:row-span-2 [&_img]:mt-1">
                    <div>
                      <Image src={LocationIcon} width={12} height={12} alt="" />
                      <dd>District</dd>
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
          })}
        </ResultsListWrapper>
      </div>
    </div>
  )
}
