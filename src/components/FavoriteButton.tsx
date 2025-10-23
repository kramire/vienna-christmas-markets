import Image from 'next/image'

const FilledHeartIcon = '/filledHeart.svg'
const EmptyHeartIcon = '/emptyHeart.svg'

interface Props {
  isFavorite: boolean
  onClick: () => void
}

const FavoriteButton = ({ isFavorite, onClick }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClick()
  }

  return (
    <button onClick={handleClick} className="absolute right-3 top-3 z-10 flex rounded-full bg-white p-2">
      <Image
        src={isFavorite ? FilledHeartIcon : EmptyHeartIcon}
        alt={isFavorite ? 'Favorite Venue' : 'Not a favorited venue'}
        className="flex-shrink-0"
        loading="lazy"
        width={16}
        height={16}
      />
    </button>
  )
}

export default FavoriteButton
