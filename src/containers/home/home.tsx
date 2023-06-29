import Flex from '../../components/flex'
import HomeImage from '../../assets/karls-christmas.webp'

const Home = () => {
  return (
    <>
      <Flex
        className="animate-slide-in"
        flexDirection="column"
        gap="24px 16px"
        justifyContent="center"
        style={{ marginBottom: '12px' }}
      >
        <div style={{ position: 'relative' }}>
          <img
            width="100%"
            height="550px"
            alt="Karl's Kirche"
            style={{
              width: '100vw',
              height: `calc(100vh - 140px)`,
              objectFit: 'cover',
              filter: 'brightness(0.5)',
              boxShadow: 'rgb(0 0 0 / 48%) 0px 2px 5px 1px',
            }}
            loading="eager"
            src={HomeImage}
          />
          <h1
            style={{
              fontSize: '26px',
              color: 'white',
              lineHeight: '34px',
              position: 'absolute',
              top: '12px',
              textAlign: 'center',
              background: '#0000009e',
              width: '100%',
              padding: '8px',
            }}
          >
            Discover the magic of Christmas in Vienna
          </h1>
        </div>
      </Flex>
      {/* <Flex flexDirection="column" gap="24px 16px" justifyContent="center" style={{ padding: '0px 24px 24px' }}>
        <HomeItem
          title="Visit Christmas Markets"
          description="Enjoy the Christmas season with traditional food, drinks, and shopping at the Viennese Christmas Markets."
          actionLabel="See the markets"
          handleClick={() => goToPage(PageType.MARKETS)}
        />
        <HomeItem
          title="Check out Pop Ups & Events"
          description="Whether it's ice curling, wurst grilling, or design markets, there's something seasonal for everyone."
          actionLabel="View events"
          handleClick={() => goToPage(PageType.EVENTS)}
        />
        <HomeItem
          title="Take on the Challenge"
          description="Eager to visit all of Vienna's Christmas Markets? Keep track of
              your progress right here!"
          actionLabel="Track progress"
          handleClick={() => goToPage(PageType.VISITS)}
        />
      </Flex> */}
    </>
  )
}

export default Home
