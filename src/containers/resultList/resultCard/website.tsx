import Image from 'next/image'

import InfoIcon from '../../../../public/info.svg'

interface Props {
  website: string | null
  marketName: string
}

export const Website = ({ website, marketName }: Props) => {
  if (!website) {
    return null
  }
  return (
    <div className="flex items-center gap-4">
      <Image src={InfoIcon} width={16} height={16} alt="" />
      <a href={website} target="_blank" aria-label={`Homepage for the ${marketName} event.`} className="underline">
        Website
      </a>
    </div>
  )
}
