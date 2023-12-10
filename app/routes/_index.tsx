import { Form } from '@remix-run/react'
import Upload from '~/components/Upload'
import { insert } from '~/lib/harper.server'
import { ActionFunctionArgs, redirect } from '@remix-run/node'

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData()
  let photographDataURL, photographerDataURL
  const alt = body.get('alt') as string
  const slug = body.get('slug') as string
  const name = body.get('name') as string
  const tagline = body.get('tagline') as string
  const photographURL = body.get('_photograph') as string
  const photographWidth = body.get('_photograph_w') as string
  const photographHeight = body.get('_photograph_h') as string
  if (photographURL) {
    const tmp = await fetch(photographURL + '?tr=w-608,bl-50')
    const buffer = Buffer.from(await tmp.arrayBuffer())
    photographDataURL = `data:image/jpeg;base64,${buffer.toString('base64')}`
  }
  const photographerURL = body.get('_photographer-image') as string
  const photographerWidth = body.get('_photographer-image_w') as string
  const photographerHeight = body.get('_photographer-image_h') as string
  if (photographerURL) {
    const tmp = await fetch(photographerURL + '?tr=w-608,bl-50')
    const buffer = Buffer.from(await tmp.arrayBuffer())
    photographerDataURL = `data:image/jpeg;base64,${buffer.toString('base64')}`
  }
  const { inserted_hashes } = await insert([
    {
      alt,
      slug,
      name,
      tagline,
      photographerURL,
      photographerWidth,
      photographerHeight,
      photographerDataURL,
      photographURL,
      photographWidth,
      photographHeight,
      photographDataURL,
    },
  ])
  if (inserted_hashes && inserted_hashes[0]) return redirect('/pics/' + slug)
}

export default function Index() {
  return (
    <Form navigate={false} method="post" className="mt-8 flex flex-col">
      <span className="text-2xl font-semibold">Upload New Photograph</span>
      <span className="mt-8 font-medium">Photographer's Image</span>
      <Upload className="mt-4 rounded-full w-[150px] h-[150px]" selector="photographer-image" />
      <span className="mt-8 font-medium">Photographer's Name</span>
      <input autoComplete="off" id="name" name="name" placeholder="Photographer's Name" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <span className="mt-8 font-medium">Photograph's Tagline</span>
      <input autoComplete="off" id="tagline" name="tagline" placeholder="Photograph's Tagline" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <span className="mt-8 font-medium">Photograph</span>
      <Upload className="mt-4" selector="photograph" />
      <span className="mt-8 font-medium">Photograph's Alt Text</span>
      <input autoComplete="off" id="alt" name="alt" placeholder="Photograph's Alt Text" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <span className="mt-8 font-medium">Slug</span>
      <input autoComplete="off" id="slug" name="slug" placeholder="Slug" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <button type="submit" className="bg-white hover:bg-black text-black hover:text-white mt-8 px-3 border border-black py-1 rounded max-w-max">
        Publish &rarr;
      </button>
    </Form>
  )
}
