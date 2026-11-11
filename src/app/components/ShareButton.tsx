import { useTranslations } from 'next-intl'
import { ActionButton } from './ActionButton'

const ShareIcon = '/arrow-up-from-bracket.svg'

interface Props {
  shareUrl: string
}

const ShareButton = ({ shareUrl }: Props) => {
  const t = useTranslations('common')

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await navigator.share({ url: shareUrl })
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  return (
    <ActionButton
      onClick={handleClick}
      ariaLabel={t('shareThisPage')}
      icon={ShareIcon}
    />
  )
}

export default ShareButton
