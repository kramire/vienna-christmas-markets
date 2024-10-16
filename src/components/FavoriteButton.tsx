import Image from 'next/image'

const FilledHeartIcon = '/filledHeart.svg'
const EmptyHeartIcon = '/emptyHeart.svg'

interface Props {
  isFavorite: boolean
  handleClick: () => void
}

const FavoriteButton = ({ isFavorite, handleClick }: Props) => (
  <Image
    onClick={(e) => {
      e.preventDefault()
      handleClick()
    }}
    src={isFavorite ? FilledHeartIcon : EmptyHeartIcon}
    alt={isFavorite ? 'Favorite Venue' : 'Not a favorited venue'}
    loading="lazy"
    width={20}
    height={20}
  />
)

export default FavoriteButton
