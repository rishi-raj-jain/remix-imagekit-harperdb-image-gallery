import Image from '../Image'
import { staticImagePlaceholder } from '@/lib/image'

const image = {
  alt: 'Loading',
  slug: 'loading',
  name: 'Loading',
  tagline: 'Loading',
  photographerURL: staticImagePlaceholder,
  photographerWidth: 1000,
  photographerHeight: 1000,
  photographerDataURL: staticImagePlaceholder,
  photographURL: staticImagePlaceholder,
  photographWidth: 1000,
  photographHeight: 1000,
  photographDataURL: staticImagePlaceholder,
}

export default function () {
  return (
    <div className="mt-8 flex flex-col">
      <span className="text-2xl font-semibold">{image.name}</span>
      <div className="mt-8 flex flex-row items-start gap-x-3">
        <Image
          alt={image.name}
          url={image.photographerURL}
          width={image.photographerWidth}
          height={image.photographerHeight}
          className="rounded-full w-[50px] h-[50px]"
          backgroundImage={image.photographerDataURL}
        />
        <div className="flex flex-col">
          <span className="text-black font-semibold">{image.name}</span>
          <span className="text-gray-400">{image.tagline}</span>
        </div>
      </div>
      <Image
        alt={image.alt}
        loading="eager"
        className="mt-8"
        url={image.photographURL}
        width={image.photographWidth}
        height={image.photographHeight}
        backgroundImage={image.photographDataURL}
      />
    </div>
  )
}
