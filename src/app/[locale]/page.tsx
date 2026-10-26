import Image from 'next/image'
import LinkedSection from '../components/LinkedSection'
import { HOME_LINKED_SECTIONS } from '../App.constants'
import { getTranslations } from 'next-intl/server';

const HeroImage = '/Vienna-City-Center-Christmas-Lights.webp'

export default async function HomePage() {
  const t = await getTranslations('homePage');
  return (
    <div className="flex flex-col pb-10 md:p-5">
      <div className="relative flex flex-col items-center justify-end md:flex-row md:justify-start md:gap-20">
        <h1 className="px-3 py-8 text-center text-3xl font-bold text-green-950 md:flex-1 md:px-5 md:text-5xl lg:text-6xl">
          {t('titlePrefix')}
          <span className="align-middle text-lg md:text-2xl"> ✨</span>
          <span className="text-red-500">{t('titleHighlight')}</span>
          <span className="align-middle text-lg md:text-2xl">✨ </span>
          {t('titleSuffix')}
        </h1>
        <div className="h-full w-full bg-green-950 md:flex-1 md:py-8 md:pr-4">
          <Image
            src={HeroImage}
            width={477}
            height={318}
            alt="Saint Stephan's Cathedral and Christmas"
            className="right-5 object-contain shadow-xl md:relative"
            preload
          />
        </div>
      </div>
      <div className="grid grid-cols-1 justify-around gap-4 px-6 text-green-950 sm:grid-cols-2 md:gap-6 md:px-0 lg:grid-cols-3">
        {HOME_LINKED_SECTIONS.map(({ to, img, titleKey, descriptionKey }) => (
          <LinkedSection key={to} to={to} img={img} titleKey={titleKey} descriptionKey={descriptionKey} />
        ))}
      </div>
    </div>
  )
}
