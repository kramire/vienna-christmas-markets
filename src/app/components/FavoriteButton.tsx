import { useTranslations } from 'next-intl'
import { ActionButton } from './ActionButton'

const FilledHeartIcon = '/filledHeart.svg'
const EmptyHeartIcon = '/emptyHeart-white.svg'

interface Props {
  isFavorite: boolean
  onClick: () => void
}

const FavoriteButton = ({ isFavorite, onClick }: Props) => {
  const t = useTranslations('common')

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClick()
  }

  return (
    <ActionButton
      onClick={handleClick}
      ariaLabel={isFavorite ? t('unmarkAsFavorite') : t('markAsFavorite')}
      icon={isFavorite ? FilledHeartIcon : EmptyHeartIcon}
    />
  )
}

export default FavoriteButton
