import { useEffect, useState } from 'react'
import { Event, Market, ResultType, StreetLights } from '../../../App.types'
import Image from 'next/image'
import Link from 'next/link'
import { localizeDate } from '../../../utils/localize-date'
import MapResultImage from './MapResultImage'

const CloseIcon = '/close.svg'

interface Props {
  result: Market | Event | StreetLights
  onClose: () => void
}

const MapResultPopupContent = ({ result, onClose }: Props) => {
  const [language, setLanguage] = useState('en-GB')

  const { id, name, district, slug, type } = result

  const startDate =
    type === ResultType.MARKET || type === ResultType.EVENT
      ? result.start
        ? localizeDate({ date: result.start, language })
        : 'TBD'
      : null

  const endDate =
    type === ResultType.MARKET || type === ResultType.EVENT
      ? result.end
        ? localizeDate({ date: result.end, language })
        : 'TBD'
      : null

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClose()
  }

  useEffect(() => {
    setLanguage(navigator.language)
  }, [])

  return (
    <div className="absolute bottom-4 z-10 flex w-full gap-2 rounded bg-white p-3 sm:left-1/2 sm:w-1/2 sm:-translate-x-1/2 sm:gap-3 sm:p-4">
      <MapResultImage resultId={id} />
      <div className="flex-1 space-y-1 sm:space-y-2">
        <h2 className="text-base font-semibold text-green-950 sm:text-lg">{name}</h2>
        <dl className="space-y-1 text-sm sm:space-y-2 sm:text-base">
          <div className="flex gap-2">
            <dd>District</dd>
            <p>•</p>
            <dt>{district}</dt>
          </div>
          {startDate && (
            <div className="flex flex-wrap gap-x-1 sm:gap-x-2">
              <dd>Dates</dd>
              <p>•</p>
              <dt>{`${startDate} - ${endDate}`}</dt>
            </div>
          )}
        </dl>
      </div>
      <button onClick={handleClose} className="h-5 w-5 flex-shrink-0">
        <Image src={CloseIcon} width={16} height={16} alt="Close popup" className="h-5 w-5 opacity-50" />
      </button>
    </div>
  )
}

const MapResultPopup = ({ result, onClose }: Props) => {
  if (result.type === ResultType.STREET_LIGHTS) {
    return <MapResultPopupContent result={result} onClose={onClose} />
  }

  return (
    <Link href={`/${result.slug}`}>
      <MapResultPopupContent result={result} onClose={onClose} />
    </Link>
  )
}

export default MapResultPopup
