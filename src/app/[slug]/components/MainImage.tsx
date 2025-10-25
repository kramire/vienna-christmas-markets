import Image, { StaticImageData } from 'next/image'

const MissingImageIcon = '/gingerbread-house.png'
interface Props {
  imgSrc: StaticImageData
  altText: string
}

const MainImage = ({ imgSrc, altText }: Props) => {
  if (imgSrc) {
    return (
      <div className="relative flex h-72 w-full lg:mt-8 lg:h-80 lg:flex-1">
        <Image
          src={imgSrc}
          alt={altText}
          fetchPriority="high"
          fill
          sizes="(max-width: 1047px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div className="flex h-72 w-full items-center justify-center border border-solid border-gray-200 bg-gray-100 lg:mt-8 lg:h-80 lg:flex-1">
      <Image src={MissingImageIcon} width={56} height={56} alt="Gingerbread house" />
    </div>
  )
}

export default MainImage
