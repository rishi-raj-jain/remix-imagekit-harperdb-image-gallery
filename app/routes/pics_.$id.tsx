import Image from '~/components/Image'
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
      <div className="mt-8 flex flex-row items-start gap-x-3">
        <Image className="rounded-full w-[50px] h-[50px]" loading="lazy" alt={image.name} url={image.photographerURL} />
        <div className="flex flex-col">
          <span className="text-black font-semibold">{image.name}</span>
          <span className="text-gray-400">{image.tagline}</span>
        </div>
      </div>
      <Image className="mt-8" alt={image.alt} url={image.photograph} loading={'eager'} />
    </div>
  )
}
