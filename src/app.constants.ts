import { StaticImageData } from 'next/image'
import { Offering, SortType } from './app.types'

import IMG_SRC_1 from '../public/Musuem-Quartier-Christmas-market.webp'
import IMG_SRC_3 from '../public/Tuerkenschanzpark-Christmas-market.webp'
import IMG_SRC_4 from '../public/Saint-Stephens-Cathedral-at-Christmas.webp'
import IMG_SRC_5 from '../public/Genuss-Christmas-market.webp'
import IMG_SRC_6 from '../public/Altes-AKH-Christmas-market.webp'
import IMG_SRC_7 from '../public/Am-Hof-Christmas-Market.webp'
import IMG_SRC_8 from '../public/Maria-Theresien-Platz-Christmas-market.webp'
import IMG_SRC_12 from '../public/Liechtenstein-Christmas-market.webp'
import IMG_SRC_14 from '../public/Karlsplatz-Christmas-market.webp'
import IMG_SRC_16 from '../public/Schoenbrunn-Christmas-market.webp'
import IMG_SRC_17 from '../public/Rathaus-Christmas-market.webp'
import IMG_SRC_18 from '../public/Prater-Christmas-market.webp'

import EISSTOCK from '../public/eisstock.png'
import GASTRONOMY from '../public/gastronomy.png'
import SHOPPING from '../public/shopping.png'

export const MAX_CONTENT_WIDTH = 1130
export const HEADER_HEIGHT = 56

export const FAVORITED_MARKETS_LOCAL_STORAGE_KEY = 'favoritedMarkets'

export const GOOGLE_MAPS_LINK = 'https://www.google.com/maps/search/?api=1'

export const resultToImgUrlMapping: { [key in number]: StaticImageData } = {
  1: IMG_SRC_1,
  3: IMG_SRC_3,
  4: IMG_SRC_4,
  5: IMG_SRC_5,
  6: IMG_SRC_6,
  7: IMG_SRC_7,
  8: IMG_SRC_8,
  12: IMG_SRC_12,
  14: IMG_SRC_14,
  16: IMG_SRC_16,
  17: IMG_SRC_17,
  18: IMG_SRC_18,
}

export const sortSelectOptions = {
  [SortType.DISTRICT]: { label: 'District' },
  [SortType.DATE]: { label: 'Start Date' },
}

export const offeringsMapping: { [key in Offering]: { name: string; icon: StaticImageData } } = {
  [Offering.OFFERING_GASTRONOMY]: { name: 'Food & Drink', icon: GASTRONOMY },
  [Offering.OFFERING_SHOPPING]: { name: 'Shopping', icon: SHOPPING },
  [Offering.OFFERING_CURLING]: { name: 'Curling', icon: EISSTOCK },
}
