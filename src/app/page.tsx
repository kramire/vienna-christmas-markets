import Image from 'next/image'
import { Routes } from '../App.types'
import LinkedSection from '../components/LinkedSection'

const HeroImage = '/Vienna-City-Center-Christmas-Lights.webp'
const ChristmasMugIcon = '/christmas-mug.png'
const ChristmasLightsIcon = '/christmas-lights.svg'
const ChristmasPresentIcon = '/christmas-present.png'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-5 pb-10 md:gap-12 md:p-5">
      <div className="flex flex-col items-center justify-end md:flex-row md:justify-start md:gap-20">
        <h1 className="px-3 py-8 text-center text-4xl font-bold text-gray-800 md:flex-1 md:px-5 md:text-5xl lg:text-6xl">
          Discover the magic of Christmas in Vienna
        </h1>
        <div className="h-full w-full bg-green-950 md:flex-1 md:py-8 md:pr-4">
          <Image
            src={HeroImage}
            width={500}
            height={300}
            alt="Saint Stephan's Cathedral and Christmas"
            className="md:relative"
            fetchPriority="high"
            loading="eager"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              boxShadow: 'rgb(0 0 0 / 48%) 0px 2px 5px 1px',
              right: '20px',
            }}
          />
        </div>
      </div>
      <div className="flex flex-col justify-around gap-8 px-6 md:flex-row md:gap-12 md:px-0">
        <LinkedSection
          to={Routes.MARKETS}
          img={{ src: ChristmasMugIcon, alt: 'Christmas drinking mug' }}
          title="Traditional Markets"
          description="Enjoy seasonal delicacies, including the famous punch and mulled wine."
        />
        <LinkedSection
          to={Routes.EVENTS}
          img={{ src: ChristmasLightsIcon, alt: 'Christmas lights' }}
          title="Pop-Ups"
          description="Check out festive pop-up events, drink stands, curling and more around the city."
        />
        <LinkedSection
          to={Routes.VISITS}
          img={{ src: ChristmasPresentIcon, alt: 'Christmas present' }}
          title="Track your Progress"
          description="Interested in visiting over 15 Christmas markets in Vienna? Track your progress!"
        />
      </div>
    </div>
  )
}
