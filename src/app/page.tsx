import Image from 'next/image'
import { Routes } from '../App.types'
import LinkedSection from '../components/LinkedSection'

const HeroImage = '/Vienna-City-Center-Christmas-Lights.webp'
const ChristmasMugIcon = '/christmas-mug.png'
const ChristmasLightsIcon = '/christmas-lights.svg'
const OpenPresentIcon = '/open-gift.svg'
const GreenCheckMarkIcon = '/green-check-mark.svg'
const RouteIcon = '/route.svg'
const MapIcon = '/christmas-map.svg'

export default function HomePage() {
  return (
    <div className="flex flex-col pb-10 md:p-5">
      <div className="relative flex flex-col items-center justify-end md:flex-row md:justify-start md:gap-20">
        <h1 className="px-3 py-8 text-center text-3xl font-bold text-green-950 md:flex-1 md:px-5 md:text-5xl lg:text-6xl">
          Discover the
          <span className="align-middle text-lg md:text-2xl"> ✨</span>
          <span className="text-red-500">Magic</span>
          <span className="align-middle text-lg md:text-2xl">✨ </span>
          of Christmas in Vienna
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
      <div className="grid grid-cols-1 justify-around gap-4 px-6 text-green-950 sm:grid-cols-2 md:gap-6 md:px-0 lg:grid-cols-3">
        <LinkedSection
          to={Routes.MARKETS}
          img={{ src: ChristmasMugIcon, alt: 'Christmas drinking mug' }}
          title="Traditional Markets"
          description="Enjoy seasonal delicacies, including the famous punch and mulled wine."
        />
        <LinkedSection
          to={Routes.EVENTS}
          img={{ src: OpenPresentIcon, alt: 'Open present' }}
          title="Pop-Ups"
          description="Check out festive events, drink stands, curling and more."
        />
        <LinkedSection
          to={Routes.LIGHTS}
          img={{ src: ChristmasLightsIcon, alt: 'Christmas lights' }}
          title="Christmas Lights"
          description="Gaze in awe at the stunning Christmas lights."
        />
        <LinkedSection
          to={Routes.ROUTES}
          img={{ src: RouteIcon, alt: 'Route path' }}
          title="Self-Guided Tours"
          description="Follow curated Christmas routes through the festive city."
        />
        <LinkedSection
          to={Routes.MAP}
          img={{ src: MapIcon, alt: 'Map icon' }}
          title="Map of Everything"
          description="Explore all Christmas festivities nearby."
        />
        <LinkedSection
          to={Routes.VISITS}
          img={{ src: GreenCheckMarkIcon, alt: 'Green check mark' }}
          title="Track your Progress"
          description="Try to visit all the Christmas markets in Vienna!"
        />
      </div>
    </div>
  )
}
