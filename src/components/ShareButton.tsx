import Image from 'next/image'

const ShareIcon = '/arrow-up-from-bracket.svg'

interface Props {
  shareUrl: string
}

const ShareButton = ({ shareUrl }: Props) => {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    try {
      await navigator.share({ url: shareUrl })
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }
  return (
    <button onClick={handleClick} className="flex rounded-full bg-white p-2 duration-300 ease-in-out active:scale-90">
      <Image
        src={ShareIcon}
        alt="Share this link"
        className="h-5 w-5 flex-shrink-0 sm:duration-300 sm:ease-in-out sm:hover:scale-110"
        width={20}
        height={20}
        unoptimized
      />
    </button>
  )
}

export default ShareButton
