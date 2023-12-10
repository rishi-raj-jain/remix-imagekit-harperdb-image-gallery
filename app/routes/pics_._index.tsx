import Image from '~/components/Image'
import { searchByValue } from '~/lib/harper.server'
import { Link, useLoaderData } from '@remix-run/react'

export async function loader() {
  return await searchByValue('*', 'id')
}

export default function Pics() {
  const images = useLoaderData<typeof loader>()
  return (
    <div className="mt-8 flex flex-col">
      <span className="text-2xl font-semibold">My Collection</span>
      <div className="mt-8 grid grid-cols-2 gap-8">
        {images
          .filter((i: { [k: string]: string }) => i.slug && i.photographURL && i.photographWidth)
          .map((i: { [k: string]: string }, _: number) => (
            <Link key={_} to={'/pics/' + i.slug}>
              <Image
                alt={i.alt}
                url={i.photographURL}
                width={i.photographWidth}
                height={i.photographHeight}
                loading={_ === 0 ? 'eager' : 'lazy'}
                backgroundImage={i.photographDataURL}
              />
            </Link>
          ))}
      </div>
    </div>
  )
}
