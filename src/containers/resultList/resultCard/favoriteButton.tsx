import FilledHeartIcon from '../../../assets/filledHeart.svg'
import EmptyHeartIcon from '../../../assets/emptyHeart.svg'

interface Props {
  isFavorite: boolean
  handleClick: () => void
}

const FavoriteButton = ({ isFavorite, handleClick }: Props) => (
  <img
    onClick={handleClick}
    src={isFavorite ? FilledHeartIcon : EmptyHeartIcon}
    alt={isFavorite ? 'Favorite Venue' : 'Not a favorited venue'}
    loading="lazy"
    width="20px"
    height="20px"
    style={{
      marginTop: '6px',
      width: '20px',
      height: '20px',
      outline: 'none',
    }}
  />
)

export default FavoriteButton
