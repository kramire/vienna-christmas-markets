import Image, { StaticImageData } from 'next/image'

const MissingImageIcon = '/gingerbread-house.png'
interface Props {
  imgSrc: StaticImageData
  altText: string
}

const CardImage = ({ imgSrc, altText }: Props) => {
  if (imgSrc) {
    return (
      <Image
        src={imgSrc}
        alt={altText}
        width={300}
        height={256}
        className="w-full h-64 object-cover border border-solid border-gray-300"
      />
    )
  }

  return (
    <div className="w-full h-64 flex justify-center items-center border border-solid border-gray-200 bg-gray-100">
      <Image src={MissingImageIcon} width={56} height={56} alt="Gingergread house" />
    </div>
  )
}

export default CardImage
