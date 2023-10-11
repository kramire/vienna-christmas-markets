import { StaticImageData } from 'next/image'

export const MAX_CONTENT_WIDTH = 1130
export const HEADER_HEIGHT = 56

export const FAVORITED_MARKETS_LOCAL_STORAGE_KEY = 'favoritedMarkets'

import IMG_SRC_1 from '../public/Musuem-Quartier-Christmas-market.webp'
import IMG_SRC_3 from '../public/Tuerkenschanzpark-Christmas-market.webp'
import IMG_SRC_4 from '../public/Saint-Stephens-Cathedral-at-Christmas.webp'
import IMG_SRC_5 from '../public/Genuss-Christmas-market.webp'
import IMG_SRC_6 from '../public/Altes-AKH-Christmas-market.webp'
import IMG_SRC_8 from '../public/Maria-Theresien-Platz-Christmas-market.webp'
import IMG_SRC_12 from '../public/Liechtenstein-Christmas-market.webp'
import IMG_SRC_14 from '../public/Karlsplatz-Christmas-market.webp'
import IMG_SRC_16 from '../public/Schoenbrunn-Christmas-market.webp'
import IMG_SRC_17 from '../public/Rathaus-Christmas-market.webp'
import IMG_SRC_18 from '../public/Prater-Christmas-market.webp'

export const resultToImgUrlMapping: { [key in number]: StaticImageData } = {
  1: IMG_SRC_1,
  3: IMG_SRC_3,
  4: IMG_SRC_4,
  5: IMG_SRC_5,
  6: IMG_SRC_6,
  8: IMG_SRC_8,
  12: IMG_SRC_12,
  14: IMG_SRC_14,
  16: IMG_SRC_16,
  17: IMG_SRC_17,
  18: IMG_SRC_18,
}
