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
      className="flex rounded-full bg-white p-2 duration-300 ease-in-out active:scale-90"
    >
      <Image
        src={isFavorite ? FilledHeartIcon : EmptyHeartIcon}
        alt={isFavorite ? 'Click to unmark this event as a favorite.' : 'Click to mark this event as a favorite.'}
        className="h-5 w-5 flex-shrink-0 sm:duration-300 sm:ease-in-out sm:hover:scale-110"
        width={20}
        height={20}
        unoptimized
      />
    </button>
  )
}

export default FavoriteButton
