import Image, { StaticImageData } from 'next/image'

const MissingImageIcon = '/gingerbread-house.png'
interface Props {
  imgSrc: StaticImageData
  altText: string
}

const MainImage = ({ imgSrc, altText }: Props) => {
  if (imgSrc) {
    return (
      <div className="flex justify-center flex-1 lg:pt-8">
        <Image src={imgSrc} alt={altText} style={{ objectFit: 'cover', width: '100%', height: '420px' }} />
      </div>
    )
  }

  return (
    <div className="w-full flex-2 h-64 flex justify-center items-center border border-solid border-gray-200 bg-gray-100">
      <Image src={MissingImageIcon} width={56} height={56} alt="Gingergread house" />
    </div>
  )
}

export default MainImage
