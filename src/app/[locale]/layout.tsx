import './globals.css'
import Header from '../components/Header'
import { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { CURRENT_YEAR, WEBSITE_URL } from '../App.constants'
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server'
import LanguageSwitcher from '../components/LanguageSwitcher'

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('homePage')
  return {
    title: t('metaTitle', { currentYear: CURRENT_YEAR }),
    description: t('metaDescription'),
    metadataBase: new URL(WEBSITE_URL),
    openGraph: {
      title: t('metaTitle', { currentYear: CURRENT_YEAR }),
      description: t('metaDescription'),
      type: 'website',
      images: ['/Vienna-City-Center-Christmas-Lights.webp'],
    },
    twitter: {
      title: t('metaTitle', { currentYear: CURRENT_YEAR }),
      description: t('metaDescription'),
      card: 'summary_large_image',
      images: ['/Vienna-City-Center-Christmas-Lights.webp'],
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('common')
  return (
    <html className={poppins.className}>
      <body className="m-0 min-h-screen min-w-xs overflow-x-hidden">
        <NextIntlClientProvider>
          <Header />
          <main className="mx-auto my-0 max-w-6xl">
            {children}
          </main>
          <footer className="w-full bg-green-950 text-white flex gap-1 lg:gap-2 py-4 items-center justify-around lg:px-2">
            <div className="hidden lg:block flex-1" />
            <div className="flex flex-col lg:gap-2 items-center lg:flex-5">
              <p className="text-sm lg:text-base font-medium">{t('footerMadeWith')}</p>
              <p className="text-[8px] lg:text-xs">{t('allRightsReserved')}</p>
            </div>
            <div className="lg:flex-1">
              <LanguageSwitcher />
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
