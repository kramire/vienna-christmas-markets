import HeaderText from '../../components/HeaderText'
import { StreetLights, Market, Event } from '../../App.types'
import Map from '../../components/Map'
import Image from 'next/image'

const MugIcon = '/christmas-mug.png'
const LightsIcon = '/christmas-lights.svg'
const OpenPresentIcon = '/open-gift.svg'

interface Props {
  results: Array<Market | Event | StreetLights>
}

export default function Content({ results }: Props) {
  return (
    <div className="m-auto flex h-full w-full flex-col p-4 lg:py-6">
      <div className="flex flex-col gap-1 md:gap-3">
        <HeaderText />
        <p className="text-sm md:text-base">
          {results.length} {results.length === 1 ? 'result' : 'results'} found
        </p>
      </div>
      <ul className="flex gap-4 overflow-x-auto px-1 py-5 text-sm font-medium sm:text-base lg:py-6">
        <li className="flex flex-shrink-0 items-center gap-2">
          <Image src={MugIcon} alt="" width={16} height={16} />
          <span>Market</span>
        </li>
        <li className="flex flex-shrink-0 items-center gap-2">
          <Image src={OpenPresentIcon} alt="" width={16} height={16} />
          <span>Pop-up</span>
        </li>
        <li className="flex flex-shrink-0 items-center gap-2">
          <Image src={LightsIcon} alt="" width={16} height={16} />
          <span>Lights</span>
        </li>
      </ul>
      <Map
        results={results}
        className="z-10 h-[65vh] w-[calc(100vw+32px)] -translate-x-4 md:w-full md:translate-x-0"
        markerVariant="card"
        hasCustomIcons
        zoom={14}
      />
    </div>
  )
}
