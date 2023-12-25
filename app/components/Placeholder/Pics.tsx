import Image from '../Image'
import { staticImagePlaceholder } from '@/lib/image'

export default function () {
  return (
    <div className="mt-8 flex flex-col">
      <span className="text-2xl font-semibold">My Collection</span>
      <div className="mt-8 flex flex-row items-center w-full gap-x-2">
        <input id="search" name="search" autoComplete="off" placeholder="Search" className="border outline-none w-full focus:border-black rounded px-4 py-1.5" />
        <button type="submit" className="bg-white hover:bg-black text-black hover:text-white px-3 border border-black py-1 rounded max-w-max">
          Search
        </button>
      </div>
      {new Array(3)
        .fill({
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
        })
        .map((i: any, _: number) => (
          <div className="relative mt-8" key={_}>
            <div className="absolute bg-black border border-gray-600 rounded px-3 py-1 bottom-4 left-4 flex flex-row items-center min-h-[20px] gap-x-2 z-20">
              <Image
                alt={i.name}
                url={i.photographerURL}
                width={i.photographerWidth}
                height={i.photographerHeight}
                backgroundImage={i.photographerDataURL}
                className="h-[20px] w-[20px] rounded-full animate-pulse"
              />
              <span className="text-gray-400">{i.name}</span>
            </div>
            <Image
              alt={i.alt}
              loading="eager"
              url={i.photographURL}
              width={i.photographWidth}
              className="animate-pulse"
              height={i.photographHeight}
              backgroundImage={i.photographDataURL}
            />
          </div>
        ))}
    </div>
  )
}
