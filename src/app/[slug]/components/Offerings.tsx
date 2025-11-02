import Image from 'next/image'
import { Offering } from '../../../App.types'
import { offeringsMapping } from '../../../App.constants'
import { cn } from '../../../utils/cn'

interface Props {
  offerings: Array<Offering>
}

export const Offerings = ({ offerings }: Props) => (
  <>
    <h2 className="text-xl font-semibold text-green-950">What to expect</h2>
    {Object.keys(offeringsMapping).map((offering) => {
      const { name, icon } = offeringsMapping[offering as Offering]
      const isAvailable = offerings.includes(offering as Offering)
      return (
        <div key={offering} className={cn('flex items-center gap-3', !isAvailable && 'line-through opacity-40')}>
          <Image src={icon} width={24} height={24} alt="" className="h-5 w-5 sm:h-6 sm:w-6" />
          {name}
        </div>
      )
    })}
  </>
)
