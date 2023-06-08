export const FOOTER_HEIGHT = 60

export const FAVORITED_MARKETS_LOCAL_STORAGE_KEY = 'favoritedMarkets'

import IMG_SRC_1 from './data/images/Musuem_Quartier_Christmas_market.webp'
import IMG_SRC_3 from './data/images/Tuerkenschanzpark_Christmas_market.webp'
import IMG_SRC_5 from './data/images/Genuss_Christmas_market.webp'
import IMG_SRC_6 from './data/images/Altes_AKH_Christmas_market.webp'
import IMG_SRC_8 from './data/images/Maria_ Theresien_Platz_Christmas_market.webp'
import IMG_SRC_12 from './data/images/Liechtenstein_Christmas_market.webp'
import IMG_SRC_16 from './data/images/Schoenbrunn_Christmas_market.webp'
import IMG_SRC_17 from './data/images/Rathaus_Christmas_market.webp'
import IMG_SRC_18 from './data/images/Prater_Christmas_market.webp'

export const resultToImgUrlMapping: { [key in number]: string } = {
  1: IMG_SRC_1,
  3: IMG_SRC_3,
  5: IMG_SRC_5,
  6: IMG_SRC_6,
  8: IMG_SRC_8,
  12: IMG_SRC_12,
  16: IMG_SRC_16,
  17: IMG_SRC_17,
  18: IMG_SRC_18,
}
