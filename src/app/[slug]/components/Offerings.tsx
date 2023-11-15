import Image from 'next/image'
import { Offering } from '../../../app.types'
import { offeringsMapping } from '../../../app.constants'

interface Props {
  offerings: Array<Offering>
}

export const Offerings = ({ offerings }: Props) => (
  <>
    <h2 className="text-xl font-semibold text-green-950">What to expect</h2>
    {offerings.map((offering) => {
      const { name, icon } = offeringsMapping[offering]
      return (
        <div key={offering} className="flex gap-3">
          <Image src={icon} width={20} alt="" />
          {name}
        </div>
      )
    })}
  </>
)
