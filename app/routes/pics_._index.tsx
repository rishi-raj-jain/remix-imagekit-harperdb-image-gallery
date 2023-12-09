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
          .filter((i: { [k: string]: string }) => i.slug && i.imageURL)
          .map((i: { [k: string]: string }, _: number) => (
            <Link to={'/pics/' + i.slug}>
              <img
                key={_}
                alt={i.alt}
                loading="lazy"
                src={i.imageURL}
                className="bg-cover bg-center bg-no-repeat transform will-change-auto"
                style={{ backgroundImage: `url(${i.imageURL + '?tr=bl-50'})`, transform: 'translate3d(0, 0, 0)' }}
              />
            </Link>
          ))}
      </div>
    </div>
  )
}