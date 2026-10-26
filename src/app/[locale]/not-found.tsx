'use client'

import Image from 'next/image'
import { menuItems } from '../components/Header/Header.constants'
import Link from 'next/link'
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('common');
  const t_navigation = useTranslations('navigation')
  return (
    <div className="mx-auto flex h-[calc(100vh-52px)] w-full flex-col items-center justify-center gap-2 text-green-950 md:w-1/2">
      <h1 className="text-xl font-semibold lg:text-3xl">404 - {t('pageNotFound')}</h1>
      <p className="text-base">{t('tryAnotherPage')}</p>
      <div className="flex flex-col gap-3">
        {menuItems.map(({ translationKey, to, icon }) => (
          <Link href={to} key={to} className="flex flex-1 items-center gap-4 rounded-sm border border-green-950 px-3 py-2">
            <Image src={icon} width={20} height={20} alt="" className="h-5 w-5" unoptimized />
            <h2 className="text-base font-medium">{t_navigation(translationKey)}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}
