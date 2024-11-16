import { StreetLights } from '../../App.types'
import data from './lights-data.json'
import sortResultsByDistrict from '../../utils/sort-results-by-district'
import CardImage from '../../components/CardImage'
import Image from 'next/image'
import { resultToImgUrlMapping } from './Lights.constants'

const LocationIcon = '/location.svg'

export default function LightsPage() {
  const results = data as Array<StreetLights>

  const sortedResults = results.filter((result) => result.isActive).sort(sortResultsByDistrict) as Array<StreetLights>

  return (
    <ul
      className="m-0 grid list-none justify-between gap-7 gap-y-9 p-0"
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', // TODO - need this responsive rather than auto-fit
      }}
    >
      {sortedResults.map((result) => {
        const { id, name, district } = result
        const imgSrc = resultToImgUrlMapping[id]
        return (
          <li key={id} className="relative flex w-full flex-col gap-3 shadow-md">
            <CardImage imgSrc={imgSrc} altText={name} />
            <div className="flex w-full flex-1 flex-col justify-between space-y-4 px-4 py-6">
              <h2 className="text-xl font-semibold text-green-950">{name}</h2>
              <dl className="space-y-4 [&>div]:grid [&>div]:grid-cols-[12px_1fr] [&>div]:gap-x-4 [&_dd]:text-sm [&_dd]:font-semibold [&_img]:row-span-2 [&_img]:mt-1">
                <div>
                  <Image src={LocationIcon} width={12} height={12} alt="" />
                  <dd>District</dd>
                  <dt>{district}</dt>
                </div>
              </dl>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
