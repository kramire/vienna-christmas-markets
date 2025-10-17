import Image, { StaticImageData } from 'next/image'

const MissingImageIcon = '/gingerbread-house.png'
interface Props {
  imgSrc: StaticImageData
  altText: string
}

const CardImage = ({ imgSrc, altText }: Props) => {
  if (imgSrc) {
    return <Image src={imgSrc} alt={altText} fill className="border-b border-gray-300 object-cover" />
  }
  return (
    <div className="flex h-full items-center justify-center border border-solid border-gray-200 bg-gray-100">
      <Image src={MissingImageIcon} width={56} height={56} alt="Gingerbread house" />
    </div>
  )
}

export default CardImage
