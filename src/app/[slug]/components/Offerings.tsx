import Image from 'next/image'
import { Offering } from '../../../App.types'
import { offeringsMapping } from '../../../App.constants'

interface Props {
  offerings: Array<Offering>
}

export const Offerings = ({ offerings }: Props) => (
  <>
    <h2 className="text-xl font-semibold text-green-950">What to expect</h2>
    {offerings.map((offering) => {
      const { name, icon } = offeringsMapping[offering]
      return (
        <div key={offering} className="flex items-center gap-3">
          <Image src={icon} width={24} height={24} alt="" className="h-5 w-5 sm:h-6 sm:w-6" />
          {name}
        </div>
      )
    })}
  </>
)
