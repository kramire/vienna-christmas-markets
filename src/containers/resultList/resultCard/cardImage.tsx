import MissingImageIcon from '../../../assets/gingerbread-house.png'

interface Props {
  imgSrc: string
  altText: string
}

const CardImage = ({ imgSrc, altText }: Props) => {
  if (imgSrc) {
    return (
      <img
        src={imgSrc}
        alt={altText}
        width="100%"
        height="256px"
        class="w-full h-64 object-cover border border-solid border-gray-300"
      />
    )
  }

  return (
    <div class="w-full h-64 flex justify-center items-center border border-solid border-gray-200 bg-gray-100">
      <img src={MissingImageIcon} width={56} height={56} alt="Gingergread house" />
    </div>
  )
}

export default CardImage
