import Image from 'next/image'

const FilledHeartIcon = '/filledHeart.svg'
const EmptyHeartIcon = '/emptyHeart.svg'

interface Props {
  isFavorite: boolean
  onClick: () => void
}

const FavoriteButton = ({ isFavorite, onClick }: Props) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
      className="absolute right-3 top-3 z-10 flex rounded-full bg-white p-2 duration-300 ease-in-out active:scale-90"
    >
      <Image
        src={isFavorite ? FilledHeartIcon : EmptyHeartIcon}
        alt={isFavorite ? 'Favorite Venue' : 'Not a favorited venue'}
        className="flex-shrink-0 sm:duration-300 sm:ease-in-out sm:hover:scale-110"
        width={20}
        height={20}
        unoptimized
      />
    </button>
  )
}

export default FavoriteButton
