'use client'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '../../i18n/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ux/Select'

const GlobeIcon = '/globe.svg'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const handleSelect = (nextLocale: 'en' | 'de') => {
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <Select value={locale} onValueChange={(value) => handleSelect(value as 'en' | 'de')}>
      <SelectTrigger color="white" className="border-white rounded-sm px-2 py-1 font-medium md:text-base md:font-normal flex gap-2">
        <Image src={GlobeIcon} width={16} height={16} alt="Language" className="size-4" unoptimized />
        {locale === 'en' ? 'English' : 'Deutsch'}
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectItem key="lang-en" value="en">
          English
        </SelectItem>
        <SelectItem key="lang-de" value="de">
          Deutsch
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
