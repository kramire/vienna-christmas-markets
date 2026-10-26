import Image from 'next/image'
import { useTranslations } from 'next-intl'

const MapIcon = '/mapicon.svg'
const ListIcon = '/listicon.svg'

interface Props {
  showMap: boolean
  toggleMap: () => void
}

const MapToggle = ({ showMap, toggleMap }: Props) => {
  const t = useTranslations('common')
  return (
    <div onClick={toggleMap} className="flex cursor-pointer items-center gap-2 text-green-950">
      <p className="text-sm font-medium underline md:text-base md:font-normal">{showMap ? t('viewList') : t('viewMap')}</p>
      <Image src={showMap ? ListIcon : MapIcon} width={20} height={20} alt="" className="mb-1 h-5 w-5" unoptimized />
    </div>
  )
}

export default MapToggle
