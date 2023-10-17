import Image from 'next/image'
import { Offering, ResultType } from '../../../app.types'
import { offeringsIconMapping } from '../../../app.constants'

interface Props {
  marketId: number
  availableOfferings: Array<Offering>
}

export const Offerings = ({ marketId, availableOfferings }: Props) => {
  const offerings = Object.keys(offeringsIconMapping) as Array<Offering>
  return (
    <div className="flex justify-end gap-3">
      {offerings.map((offering) => {
        const iconSrc = offeringsIconMapping[offering]
        const isAvailable = availableOfferings.includes(offering)
        return (
          <div
            key={`${marketId}_${offering}`}
            className={`p-1 rounded bg-zinc-100 shadow-md text-xs border ${isAvailable ? 'opacity-100' : 'opacity-30'}`}
          >
            <Image src={iconSrc} width={20} height={20} alt="" />
          </div>
        )
      })}
    </div>
  )
}
