import { useLoaderData } from '@remix-run/react'
import { searchByValue } from '~/lib/harper.server'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) return redirect('/404')
  const images = await searchByValue(params.id, 'slug')
  if (images && images[0]) return images[0]
  return redirect('/404')
}

export default function Pic() {
  const image = useLoaderData<typeof loader>()
  return (
    <div className="mt-8 flex flex-col">
      <span className="text-2xl font-semibold">{image.name}</span>
      <img className="mt-8" alt={image.alt} src={image.imageURL} />
    </div>
  )
}
