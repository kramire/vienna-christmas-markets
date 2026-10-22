import Link from 'next/link'
import Image from 'next/image'
import type { LinkedSection } from '../App.types'

export default function LinkedSection({ to, img, title, description }: LinkedSection) {
  return (
    <Link href={to}>
      <div className="group peer flex h-full flex-col items-center gap-3 p-4">
        <Image src={img.src} width={48} height={48} alt={img.alt} className="h-12 w-12" />
        <h2 className="text-xl font-bold underline">{title}</h2>
        <p className="text-center">{description}</p>
      </div>
    </Link>
  )
}
