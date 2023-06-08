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

  return <div class="w-full h-64 border border-solid border-gray-300 bg-gray-200" />
}

export default CardImage
