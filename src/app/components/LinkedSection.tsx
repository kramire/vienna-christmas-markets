import Link from 'next/link'
import Image from 'next/image'
import type { LinkedSection } from '../App.types'
import { getTranslations } from 'next-intl/server'

export default async function LinkedSection({ to, img, titleKey, descriptionKey }: LinkedSection) {
  const t = await getTranslations('homePage');
  return (
    <Link href={to}>
      <div className="group peer flex h-full flex-col items-center gap-3 p-4 group">
        <Image src={img.src} width={48} height={48} alt={img.alt} className="h-12 w-12 group-hover:scale-110 transition-transform duration-300" />
        <h2 className="text-xl font-bold underline">{t(titleKey)}</h2>
        <p className="text-center">{t(descriptionKey)}</p>
      </div>
    </Link>
  )
}
