import { cn } from '../../../utils/cn'
import { resultToImgUrlMapping } from '../../../App.constants'
import Image from 'next/image'

const MissingImageIcon = '/gingerbread-house.png'

interface Props {
  resultId: number
  size?: 'small' | 'default'
  imageLoading?: 'eager' | 'lazy'
}

const MapResultImage = ({ resultId, size = 'default', imageLoading = 'lazy' }: Props) => {
  const imgSrc = resultToImgUrlMapping[resultId]

  if (imgSrc) {
    return (
      <Image
        src={imgSrc}
        alt=""
        width={128}
        height={128}
        className={cn(
          'flex-shrink-0 rounded object-cover',
          size === 'small' ? 'h-20 w-20' : 'h-20 w-20 sm:h-32 sm:w-32',
        )}
        loading={imageLoading}
      />
    )
  }
  return (
    <div
      className={cn(
        'flex flex-shrink-0 items-center justify-center rounded border border-solid border-gray-200 bg-gray-100 object-cover',
        size === 'small' ? 'h-20 w-20' : 'h-20 w-20 sm:h-32 sm:w-32',
      )}
    >
      <Image src={MissingImageIcon} width={56} height={56} alt="Gingerbread house" />
    </div>
  )
}
export default MapResultImage
