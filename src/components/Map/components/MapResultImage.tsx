import { resultToImgUrlMapping } from '../../../App.constants'
import Image from 'next/image'

const MissingImageIcon = '/gingerbread-house.png'

interface Props {
  resultId: number
}

const MapResultImage = ({ resultId }: Props) => {
  const imgSrc = resultToImgUrlMapping[resultId]

  if (imgSrc) {
    return (
      <Image
        src={imgSrc}
        alt=""
        width={128}
        height={128}
        className="h-20 w-20 flex-shrink-0 rounded object-cover sm:h-32 sm:w-32"
      />
    )
  }
  return (
    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded border border-solid border-gray-200 bg-gray-100 object-cover sm:h-32 sm:w-32">
      <Image src={MissingImageIcon} width={56} height={56} alt="Gingerbread house" />
    </div>
  )
}
export default MapResultImage
