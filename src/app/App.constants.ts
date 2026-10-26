import { StaticImageData } from 'next/image'
import { LinkedSection, Offering, PriceType, SortType, Routes } from './App.types'

import IMG_SRC_1 from '../../public/Musuem-Quartier-Christmas-market.webp'
import IMG_SRC_2 from '../../public/Spittelberg-Market.webp'
import IMG_SRC_3 from '../../public/Tuerkenschanzpark-Christmas-market.webp'
import IMG_SRC_4 from '../../public/Saint-Stephens-Cathedral-at-Christmas.webp'
import IMG_SRC_5 from '../../public/Genuss-Christmas-market.webp'
import IMG_SRC_6 from '../../public/Altes-AKH-Christmas-market.webp'
import IMG_SRC_7 from '../../public/am-hof.webp'
import IMG_SRC_8 from '../../public/Maria-Theresien-Platz-Christmas-market.webp'
import IMG_SRC_10 from '../../public/Hirschstetten.webp'
import IMG_SRC_11 from '../../public/Belvedere-Market.webp'
import IMG_SRC_12 from '../../public/Liechtenstein-Christmas-market.webp'
import IMG_SRC_13 from '../../public/Freyung-Market.webp'
import IMG_SRC_14 from '../../public/Karlsplatz-Christmas-market.webp'
import IMG_SRC_16 from '../../public/Schoenbrunn-Christmas-market.webp'
import IMG_SRC_17 from '../../public/Rathaus-Christmas-market.webp'
import IMG_SRC_18 from '../../public/Prater-Christmas-market.webp'
import IMG_SRC_20 from '../../public/Badeschiff.webp'
import IMG_SRC_21 from '../../public/Haas_und_Hass.webp'
import IMG_SRC_23 from '../../public/atmosphere-rooftop.webp'
import IMG_SRC_27 from '../../public/klyo.webp'
import IMG_SRC_31 from '../../public/feuerdorf.webp'
import IMG_SRC_32 from '../../public/franz-jonas-platz.webp'
import IMG_SRC_33 from '../../public/wienter-zauber.webp'
import IMG_SRC_35 from '../../public/hauptbahnhof.webp'
import IMG_SRC_37 from '../../public/verkehrsmuseum.webp'
import IMG_SRC_38 from '../../public/simmering.webp'
import IMG_SRC_39 from '../../public/meidling.webp'
import IMG_SRC_40 from '../../public/lions-club.webp'
import IMG_SRC_41 from '../../public/barlipunsch.webp'
import IMG_SRC_42 from '../../public/graben.webp'
import IMG_SRC_43 from '../../public/kaertner-strasse.webp'
import IMG_SRC_44 from '../../public/kohlmarkt.webp'
import IMG_SRC_45 from '../../public/neuer-markt.webp'
import IMG_SRC_46 from '../../public/tuchlauben.webp'
import IMG_SRC_47 from '../../public/rotenturmstrasse.webp'
import IMG_SRC_48 from '../../public/annagasse.webp'
import IMG_SRC_49 from '../../public/dorotheergasse.webp'
import IMG_SRC_50 from '../../public/goldschmiedgasse.webp'
import IMG_SRC_51 from '../../public/Herrengasse.webp'
import IMG_SRC_52 from '../../public/palais.webp'
import IMG_SRC_53 from '../../public/spiegelgasse.webp'
import IMG_SRC_55 from '../../public/wollzeile.webp'
import IMG_SRC_56 from '../../public/landstrasse.webp'
import IMG_SRC_57 from '../../public/mariahilfestrasse.webp'
import IMG_SRC_58 from '../../public/neubaugasse.webp'
import IMG_SRC_59 from '../../public/josefstaedterstrasse.webp'
import IMG_SRC_60 from '../../public/Servitenviertel.webp'
import IMG_SRC_61 from '../../public/volksoperviertel.webp'
import IMG_SRC_70 from '../../public/waehringerstrasse.webp'
import IMG_SRC_74 from '../../public/jasonmirgottstrasse.webp'
import IMG_SRC_75 from '../../public/trattnerhof.webp'
import IMG_SRC_76 from '../../public/Skybar.webp'
import IMG_SRC_77 from '../../public/eisstock-bahn-alte-donau.webp'
import IMG_SRC_78 from '../../public/schwarzenbergplatz.webp'
import IMG_SRC_79 from '../../public/punsch-karitativ.webp'
import IMG_SRC_80 from '../../public/bauernmarkt.webp'
import IMG_SRC_81 from '../../public/obkirchergasse.webp'

import EISSTOCK from '../../public/eisstock.png'
import ICE_SKATE from '../../public/ice-skate.png'
import GASTRONOMY from '../../public/gastronomy.png'
import SHOPPING from '../../public/shopping.png'
import FERRIS_WHEEL from '../../public/ferris-wheel.svg'

// NOTE - if we ever change the url we need to update this
export const WEBSITE_URL = 'https://vienna-christmas-markets.netlify.app'

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
  33: IMG_SRC_33,
  35: IMG_SRC_35,
  37: IMG_SRC_37,
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
  48: IMG_SRC_48,
  49: IMG_SRC_49,
  50: IMG_SRC_50,
  51: IMG_SRC_51,
  52: IMG_SRC_52,
  53: IMG_SRC_53,
  55: IMG_SRC_55,
  56: IMG_SRC_56,
  57: IMG_SRC_57,
  58: IMG_SRC_58,
  59: IMG_SRC_59,
  60: IMG_SRC_60,
  61: IMG_SRC_61,
  70: IMG_SRC_70,
  74: IMG_SRC_74,
  75: IMG_SRC_75,
  76: IMG_SRC_76,
  77: IMG_SRC_77,
  78: IMG_SRC_78,
  79: IMG_SRC_79,
  80: IMG_SRC_80,
  81: IMG_SRC_81,
}

export const sortSelectOptions = {
  [SortType.DISTRICT]: { translationKey: 'district' },
  [SortType.DATE]: { translationKey: 'startDate' },
  [SortType.DRINK_PRICE_ASC]: { translationKey: 'lowestDrinkPrice' },
  [SortType.DRINK_PRICE_DESC]: { translationKey: 'highestDrinkPrice' },
}

export const offeringsMapping: { [key in Offering]: { translationKey: string; icon: StaticImageData } } = {
  [Offering.OFFERING_GASTRONOMY]: { translationKey: 'foodAndDrink', icon: GASTRONOMY },
  [Offering.OFFERING_SHOPPING]: { translationKey: 'shopping', icon: SHOPPING },
  [Offering.OFFERING_CURLING]: { translationKey: 'curling', icon: EISSTOCK },
  [Offering.OFFERING_ICE_SKATING]: { translationKey: 'iceSkating', icon: ICE_SKATE },
  [Offering.OFFERING_KIDS_RIDES]: { translationKey: 'ridesForChildren', icon: FERRIS_WHEEL },
}

export const shortWeekdayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export const priceTypeMapping: { [key in PriceType]: string } = {
  [PriceType.CURLING_PER_HALF_HOUR]: 'curlingHour30Min',
  [PriceType.CURLING_PER_HOUR]: 'curlingHour',
  [PriceType.ICE_SKATING_ADULTS]: 'iceSkatingAdults',
  [PriceType.ICE_SKATING_KIDS]: 'iceSkatingKids',
  [PriceType.NON_ALCOHOLIC]: 'nonAlcoholicDrink',
  [PriceType.MUG_DEPOSIT]: 'mugDepositFee',
  [PriceType.MULLED_WINE]: 'mulledWine',
  [PriceType.PUNCH]: 'punch',
}

export const CURRENT_YEAR = 2026

const ChristmasMugIcon = '/christmas-mug.png'
const ChristmasLightsIcon = '/christmas-lights.svg'
const OpenPresentIcon = '/open-gift.svg'
const GreenCheckMarkIcon = '/green-check-mark.svg'
const RouteIcon = '/route.svg'
const MapIcon = '/christmas-map.svg'
const HeartIcon = '/emptyHeart.svg'

export const HOME_LINKED_SECTIONS: Array<LinkedSection> = [
  {
    to: Routes.MARKETS,
    img: { src: ChristmasMugIcon, alt: 'Christmas drinking mug' },
    titleKey: 'marketsTitle',
    descriptionKey: 'marketsDescription',
  },
  {
    to: Routes.EVENTS,
    img: { src: OpenPresentIcon, alt: 'Open present' },
    titleKey: 'popUpsTitle',
    descriptionKey: 'popUpsDescription',
  },
  {
    to: Routes.LIGHTS,
    img: { src: ChristmasLightsIcon, alt: 'Christmas lights' },
    titleKey: 'lightsTitle',
    descriptionKey: 'lightsDescription',
  },
  {
    to: Routes.ROUTES,
    img: { src: RouteIcon, alt: 'Route path' },
    titleKey: 'toursTitle',
    descriptionKey: 'toursDescription',
  },
  {
    to: Routes.MAP,
    img: { src: MapIcon, alt: 'Map icon' },
    titleKey: 'mapTitle',
    descriptionKey: 'mapDescription',
  },
  {
    to: Routes.VISITS,
    img: { src: GreenCheckMarkIcon, alt: 'Green check mark' },
    titleKey: 'visitsTitle',
    descriptionKey: 'visitsDescription',
  },
  {
    to: Routes.FAVORITES,
    img: { src: HeartIcon, alt: 'Heart icon' },
    titleKey: 'favoritesTitle',
    descriptionKey: 'favoritesDescription',
  },
]

export const TIMEZONE = 'Europe/Vienna'
