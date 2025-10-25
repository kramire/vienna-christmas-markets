import { useEffect, useState } from 'react'
import { resultToImgUrlMapping } from '../../../App.constants'
import { Result } from '../../../App.types'
import Image from 'next/image'
import Link from 'next/link'
import { localizeDate } from '../../../utils/localizeDate'

const CloseIcon = '/close.svg'

interface Props {
  result: Result
  onClose: () => void
}

const MapResultPopup = ({ result, onClose }: Props) => {
  const [language, setLanguage] = useState('en-GB')

  const { id, name, district, start, end, slug } = result
  const imgSrc = resultToImgUrlMapping[id]

  const startDate = start ? localizeDate(start, language) : 'TBD'
  const endDate = end ? localizeDate(end, language) : 'TBD'

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClose()
  }

  useEffect(() => {
    setLanguage(navigator.language)
  }, [])

  return (
    <Link
      href={`/${slug}`}
      className="absolute bottom-4 z-10 flex w-full gap-2 rounded bg-white p-3 sm:left-1/2 sm:w-1/2 sm:-translate-x-1/2 sm:gap-3 sm:p-4"
    >
      <Image
        src={imgSrc}
        alt={name}
        width={128}
        height={128}
        className="h-20 w-20 flex-shrink-0 rounded object-cover sm:h-32 sm:w-32"
      />
      <div className="flex-1 space-y-1 sm:space-y-2">
        <h2 className="text-base font-semibold text-green-950 sm:text-lg">{name}</h2>
        <dl className="space-y-1 text-sm sm:space-y-2 sm:text-base">
          <div className="flex gap-2">
            <dd>District</dd>
            <p>•</p>
            <dt>{district}</dt>
          </div>
          <div className="flex flex-wrap gap-x-1 sm:gap-x-2">
            <dd>Dates</dd>
            <p>•</p>
            <dt>{`${startDate} - ${endDate}`}</dt>
          </div>
        </dl>
      </div>
      <button onClick={handleClose} className="h-5 w-5 flex-shrink-0">
        <Image src={CloseIcon} width={16} height={16} alt="Close popup" className="h-5 w-5 opacity-50" />
      </button>
    </Link>
  )
}
export default MapResultPopup
