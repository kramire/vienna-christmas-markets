import Image, { StaticImageData } from 'next/image'

const MissingImageIcon = '/gingerbread-house.png'
interface Props {
  imgSrc: StaticImageData
  altText: string
}

const MainImage = ({ imgSrc, altText }: Props) => {
  if (imgSrc) {
    return (
      <div className="flex flex-1 justify-center lg:pt-8">
        <Image src={imgSrc} alt={altText} style={{ objectFit: 'cover', width: '100%', height: '320px' }} />
      </div>
    )
  }

  return (
    <div className="flex-2 flex h-64 w-full items-center justify-center border border-solid border-gray-200 bg-gray-100">
      <Image src={MissingImageIcon} width={56} height={56} alt="Gingergread house" />
    </div>
  )
}

export default MainImage
