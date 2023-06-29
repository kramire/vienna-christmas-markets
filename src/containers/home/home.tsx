import HomeImage from '../../assets/Saint-Stephens-Cathedral-with-Christmas-Tree.webp'
import ChristmasMug from '../../assets/christmas-mug.png'
import ChristmasLights from '../../assets/christmas-lights.svg'
import ChristmasPresent from '../../assets/christmas-present.png'
import { Link } from 'preact-router/match'
import { Routes } from '../../app.types'

const Home = () => {
  return (
    <div class="flex flex-col gap-5 md:gap-12 pb-5 md:py-5">
      <div class="flex flex-col-reverse md:flex-row items-center justify-end md:justify-start md:gap-20">
        <div class="md:flex-1">
          <div class="py-8 w-full h-full" style={{ backgroundColor: 'rgb(238 193 32)' }}>
            <img
              width="90%"
              height="auto"
              alt="Saint Stephan's Cathedral and Christmas"
              class="md:relative"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                boxShadow: 'rgb(0 0 0 / 48%) 0px 2px 5px 1px',
                left: '20px',
              }}
              loading="eager"
              src={HomeImage}
            />
          </div>
        </div>
        <div class="md:flex-1 py-8 px-3 md:px-5">
          <h1 class="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 text-center">
            Discover the magic of Christmas in Vienna
          </h1>
        </div>
      </div>
      <div class="flex flex-col md:flex-row justify-around gap-8 md:gap-12 px-6 md:px-0">
        <Link href={Routes.MARKETS}>
          <div class="group flex-1 flex flex-col gap-3 items-center peer">
            <img src={ChristmasMug} width={48} height={48} alt="Christmas drinking mug" />
            <h2 class="text-xl font-bold group-hover:underline">Traditional Markets</h2>
            <p class="text-center">Enjoy the seasonal delicacies, including the famous punch and mulled wine.</p>
          </div>
        </Link>
        <Link href={Routes.EVENTS}>
          <div class="group flex-1 flex flex-col gap-3 items-center">
            <img src={ChristmasLights} width={48} height={48} alt="Christmas lights" />
            <h2 class="text-xl font-bold group-hover:underline">Pop up Events</h2>
            <p class="text-center">Check out festive popup restaurants, bars, and curling venues around the city.</p>
          </div>
        </Link>
        <Link href={Routes.VISITS}>
          <div class="group flex-1 flex flex-col gap-3 items-center">
            <img src={ChristmasPresent} width={48} height={48} alt="Chritmas present" />
            <h2 class="text-xl font-bold group-hover:underline">Track your Progress</h2>
            <p class="text-center">Interested in visiting over 15 Christmas markets in Vienna? Track your progress!</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Home
