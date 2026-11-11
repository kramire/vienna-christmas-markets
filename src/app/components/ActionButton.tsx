import Image from 'next/image'

interface Props {
  ariaLabel: string
  icon: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function ActionButton({ onClick, ariaLabel, icon }: Props) {
  return (
    <button onClick={onClick} aria-label={ariaLabel} className="flex rounded-full text-white p-2 duration-300 ease-in-out active:scale-90 hover:bg-white/50 cursor-pointer">
      <Image
        src={icon}
        alt=""
        className="h-5 w-5 shrink-0 sm:duration-300 sm:ease-in-out sm:hover:scale-110"
        width={20}
        height={20}
        unoptimized
      />
    </button>
  )
}