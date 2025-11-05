import Image, { StaticImageData } from 'next/image'

const MissingImageIcon = '/gingerbread-house.png'
interface Props {
  imgSrc: StaticImageData
  altText: string
}

const MainImage = ({ imgSrc, altText }: Props) => {
  if (imgSrc) {
    return (
      <Image src={imgSrc} alt={altText} preload fill sizes="(max-width: 1047px) 100vw, 50vw" className="object-cover" />
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center border border-solid border-gray-200 bg-gray-100">
      <Image src={MissingImageIcon} width={56} height={56} preload alt="Gingerbread house" unoptimized />
    </div>
  )
}

export default MainImage
