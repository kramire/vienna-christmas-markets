import Link from 'next/link'
import Image from 'next/image'

interface Props {
  to: string
  img: {
    src: string
    alt: string
  }
  title: string
  description: string
}

export default function LinkedSection({ to, img, title, description }: Props) {
  return (
    <Link href={to}>
      <div className="group peer flex h-full flex-col items-center gap-3 p-4">
        <Image src={img.src} width={48} height={48} alt={img.alt} />
        <h2 className="text-xl font-bold underline">{title}</h2>
        <p className="text-center">{description}</p>
      </div>
    </Link>
  )
}
