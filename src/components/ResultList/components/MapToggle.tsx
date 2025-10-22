import Image from 'next/image'

const MapIcon = '/mapicon.svg'
const ListIcon = '/listicon.svg'

interface Props {
  showMap: boolean
  toggleMap: () => void
}

const MapToggle = ({ showMap, toggleMap }: Props) => {
  return (
    <div onClick={toggleMap} className="flex cursor-pointer items-center gap-2 text-green-950">
      <Image src={showMap ? ListIcon : MapIcon} width={20} height={20} alt="" />
      <p className="text-sm underline md:text-base">{showMap ? 'View List' : 'View Map'}</p>
    </div>
  )
}

export default MapToggle
