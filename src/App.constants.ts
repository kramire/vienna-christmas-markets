import { StaticImageData } from 'next/image'
import { Offering, PriceType, SortType } from './App.types'

import IMG_SRC_1 from '../public/Musuem-Quartier-Christmas-market.webp'
import IMG_SRC_2 from '../public/Spittelberg-Market.webp'
import IMG_SRC_3 from '../public/Tuerkenschanzpark-Christmas-market.webp'
import IMG_SRC_4 from '../public/Saint-Stephens-Cathedral-at-Christmas.webp'
import IMG_SRC_5 from '../public/Genuss-Christmas-market.webp'
import IMG_SRC_6 from '../public/Altes-AKH-Christmas-market.webp'
import IMG_SRC_7 from '../public/am-hof.webp'
import IMG_SRC_8 from '../public/Maria-Theresien-Platz-Christmas-market.webp'
import IMG_SRC_10 from '../public/Hirschstetten.webp'
import IMG_SRC_11 from '../public/Belvedere-Market.webp'
import IMG_SRC_12 from '../public/Liechtenstein-Christmas-market.webp'
import IMG_SRC_13 from '../public/Freyung-Market.webp'
import IMG_SRC_14 from '../public/Karlsplatz-Christmas-market.webp'
import IMG_SRC_16 from '../public/Schoenbrunn-Christmas-market.webp'
import IMG_SRC_17 from '../public/Rathaus-Christmas-market.webp'
import IMG_SRC_18 from '../public/Prater-Christmas-market.webp'
import IMG_SRC_20 from '../public/Badeschiff.webp'
import IMG_SRC_21 from '../public/Haas_und_Hass.webp'
import IMG_SRC_23 from '../public/atmosphere-rooftop.webp'
import IMG_SRC_27 from '../public/klyo.webp'
import IMG_SRC_31 from '../public/feuerdorf.webp'
import IMG_SRC_32 from '../public/franz-jonas-platz.webp'
import IMG_SRC_35 from '../public/hauptbahnhof.webp'
import IMG_SRC_38 from '../public/simmering.webp'
import IMG_SRC_39 from '../public/meidling.webp'
import IMG_SRC_40 from '../public/lions-club.webp'
import IMG_SRC_41 from '../public/barlipunsch.webp'
import IMG_SRC_46 from '../public/bauernmarkt.webp'
import IMG_SRC_42 from '../public/graben.webp'
import IMG_SRC_43 from '../public/kaertner-strasse.webp'
import IMG_SRC_44 from '../public/kohlmarkt.webp'
import IMG_SRC_45 from '../public/neuer-markt.webp'
import IMG_SRC_47 from '../public/rotenturmstrasse.webp'
import IMG_SRC_51 from '../public/Herrengasse.webp'
import IMG_SRC_52 from '../public/palais.webp'
import IMG_SRC_58 from '../public/neubaugasse.webp'
import IMG_SRC_60 from '../public/Servitenviertel.webp'
import IMG_SRC_76 from '../public/Skybar.webp'
import IMG_SRC_79 from '../public/punsch-karitativ.webp'

import EISSTOCK from '../public/eisstock.png'
import ICE_SKATE from '../public/ice-skate.png'
import GASTRONOMY from '../public/gastronomy.png'
import SHOPPING from '../public/shopping.png'
import FERRIS_WHEEL from '../public/ferris-wheel.svg'

export const MAX_CONTENT_WIDTH = 1130
export const HEADER_HEIGHT = 56

export const FAVORITE_MARKETS_LOCAL_STORAGE_KEY = 'favoritedMarkets'

export const GOOGLE_MAPS_LINK = 'https://www.google.com/maps/search/?api=1'

export const resultToImgUrlMapping: { [key in number]: StaticImageData } = {
  1: IMG_SRC_1,
  2: IMG_SRC_2,
  3: IMG_SRC_3,
  4: IMG_SRC_4,
  5: IMG_SRC_5,
  6: IMG_SRC_6,
  7: IMG_SRC_7,
  8: IMG_SRC_8,
  10: IMG_SRC_10,
  11: IMG_SRC_11,
  12: IMG_SRC_12,
  13: IMG_SRC_13,
  14: IMG_SRC_14,
  16: IMG_SRC_16,
  17: IMG_SRC_17,
  18: IMG_SRC_18,
  20: IMG_SRC_20,
  21: IMG_SRC_21,
  23: IMG_SRC_23,
  27: IMG_SRC_27,
  31: IMG_SRC_31,
  32: IMG_SRC_32,
  35: IMG_SRC_35,
  38: IMG_SRC_38,
  39: IMG_SRC_39,
  40: IMG_SRC_40,
  41: IMG_SRC_41,
  46: IMG_SRC_46,
  42: IMG_SRC_42,
  43: IMG_SRC_43,
  44: IMG_SRC_44,
  45: IMG_SRC_45,
  47: IMG_SRC_47,
  51: IMG_SRC_51,
  52: IMG_SRC_52,
  58: IMG_SRC_58,
  60: IMG_SRC_60,
  76: IMG_SRC_76,
  79: IMG_SRC_79,
}

export const sortSelectOptions = {
  [SortType.DISTRICT]: { label: 'District' },
  [SortType.DATE]: { label: 'Start Date' },
  [SortType.DRINK_PRICE_ASC]: { label: 'Lowest Drink Price' },
  [SortType.DRINK_PRICE_DESC]: { label: 'Highest Drink Price' },
}

export const offeringsMapping: { [key in Offering]: { name: string; icon: StaticImageData } } = {
  [Offering.OFFERING_GASTRONOMY]: { name: 'Food & Drink', icon: GASTRONOMY },
  [Offering.OFFERING_SHOPPING]: { name: 'Shopping', icon: SHOPPING },
  [Offering.OFFERING_CURLING]: { name: 'Curling', icon: EISSTOCK },
  [Offering.OFFERING_ICE_SKATING]: { name: 'Ice Skating', icon: ICE_SKATE },
  [Offering.OFFERING_KIDS_RIDES]: { name: 'Rides for Children', icon: FERRIS_WHEEL },
}

export const weekDays = ['M', 'T', 'W', 'R', 'F', 'S', 'S']

export const NEAR_ME_KM_DISTANCE_AWAY = 2

export const priceTypeMapping: { [key in PriceType]: string } = {
  [PriceType.CURLING_PER_HALF_HOUR]: 'Curling - 1/2 hour',
  [PriceType.CURLING_PER_HOUR]: 'Curling - 1 hour',
  [PriceType.ICE_SKATING_ADULTS]: 'Ice Skating - Adults',
  [PriceType.ICE_SKATING_KIDS]: 'Ice Skating - Kids',
  [PriceType.PUNCH]: 'Punch',
  [PriceType.MULLED_WINE]: 'Mulled Wine',
  [PriceType.NON_ALCOHOLIC]: 'Non-Alcoholic Drink',
  [PriceType.MUG_DEPOSIT]: 'Mug Deposit Fee',
}
