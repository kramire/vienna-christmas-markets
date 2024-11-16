import IMG_SRC_2 from '../../../public/bauernmarkt.webp'
import IMG_SRC_5 from '../../../public/graben.webp'
import IMG_SRC_7 from '../../../public/kaertner-strasse.webp'
import IMG_SRC_8 from '../../../public/kohlmarkt.webp'
import IMG_SRC_9 from '../../../public/neuer-markt.webp'
import IMG_SRC_11 from '../../../public/rotenturmstrasse.webp'
import IMG_SRC_17 from '../../../public/neubaugasse.webp'
import IMG_SRC_19 from '../../../public/servitenviertel.webp'
import { StaticImageData } from 'next/image'

export const resultToImgUrlMapping: { [key in number]: StaticImageData } = {
  2: IMG_SRC_2,
  5: IMG_SRC_5,
  7: IMG_SRC_7,
  8: IMG_SRC_8,
  9: IMG_SRC_9,
  11: IMG_SRC_11,
  17: IMG_SRC_17,
  19: IMG_SRC_19,
}
