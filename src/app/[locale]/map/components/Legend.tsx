import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

const MugIcon = '/christmas-mug.png'
const LightsIcon = '/christmas-lights.svg'
const OpenPresentIcon = '/open-gift.svg'

function Legend() {
  const t = useTranslations('mapPage')
  return (
    <ul className="flex gap-4 overflow-x-auto text-sm font-medium sm:text-base">
      <li className="flex shrink-0 items-center gap-2">
        <Image src={MugIcon} alt="" width={16} height={16} className="h-4 w-4" unoptimized />
        <span>{t('market')}</span>
      </li>
      <li className="flex shrink-0 items-center gap-2">
        <Image src={OpenPresentIcon} alt="" width={16} height={16} className="h-4 w-4" unoptimized />
        <span>{t('popUp')}</span>
      </li>
      <li className="flex shrink-0 items-center gap-2">
        <Image src={LightsIcon} alt="" width={16} height={16} className="h-4 w-4" unoptimized />
        <span>{t('lights')}</span>
      </li>
    </ul>
  )
}

export default Legend
