import Link from 'next/link'
import Image from 'next/image'
import { Routes } from '../app.types'

const HeroImage = '/Vienna-City-Center-Christmas-Lights.webp'
const ChristmasMugIcon = '/christmas-mug.png'
const ChristmasLightsIcon = '/christmas-lights.svg'
const ChristmasPresentIcon = '/christmas-present.png'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-5 md:gap-12 pb-10 md:p-5">
      <div className="flex flex-col md:flex-row items-center justify-end md:justify-start md:gap-20">
        <div className="md:flex-1 py-8 px-3 md:px-5">
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 text-center">
            Discover the magic of Christmas in Vienna
          </h1>
        </div>
        <div className="md:flex-1">
          <div className="md:py-8 md:pr-4 w-full h-full bg-green-950">
            <Image
              src={HeroImage}
              width={500}
              height={300}
              alt="Saint Stephan's Cathedral and Christmas"
              className="md:relative"
              fetchPriority="high"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                boxShadow: 'rgb(0 0 0 / 48%) 0px 2px 5px 1px',
                right: '20px',
              }}
              loading="eager"
              priority
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-around gap-8 md:gap-12 px-6 md:px-0">
        <Link href={Routes.MARKETS}>
          <div className="group flex-1 flex flex-col gap-3 items-center peer">
            <Image src={ChristmasMugIcon} width={48} height={48} alt="Christmas drinking mug" />
            <h2 className="text-xl font-bold underline">Traditional Markets</h2>
            <p className="text-center">Enjoy the seasonal delicacies, including the famous punch and mulled wine.</p>
          </div>
        </Link>
        <Link href={Routes.EVENTS}>
          <div className="group flex-1 flex flex-col gap-3 items-center">
            <Image src={ChristmasLightsIcon} width={48} height={48} alt="Christmas lights" />
            <h2 className="text-xl font-bold underline">Pop up Events</h2>
            <p className="text-center">
              Check out festive popup restaurants, bars, and curling venues around the city.
            </p>
          </div>
        </Link>
        <Link href={Routes.VISITS}>
          <div className="group flex-1 flex flex-col gap-3 items-center">
            <Image src={ChristmasPresentIcon} width={48} height={48} alt="Chritmas present" />
            <h2 className="text-xl font-bold underline">Track your Progress</h2>
            <p className="text-center">
              Interested in visiting over 15 Christmas markets in Vienna? Track your progress!
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
