import { Form } from '@remix-run/react'
import { insert } from '~/lib/harper.server'
import UploadImage from '~/components/UploadImage'
import { ActionFunctionArgs, redirect } from '@remix-run/node'

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData()
  const alt = body.get('alt') as string
  const slug = body.get('slug') as string
  const name = body.get('name') as string
  const tagline = body.get('tagline') as string
  const imageURL = body.get('imageURL') as string
  const { inserted_hashes } = await insert([
    {
      alt,
      slug,
      name,
      tagline,
      imageURL
    },
  ])
  if (inserted_hashes && inserted_hashes[0]) return redirect('/pics/' + slug)
}

export default function Index() {
  return (
    <Form navigate={false} method="post" className="mt-8 flex flex-col">
      <span className="text-2xl font-semibold">Upload New Image</span>
      <span className="mt-8 font-medium">Slug</span>
      <input autoComplete="off" id="slug" name="slug" placeholder="Image Slug" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <span className="mt-4 font-medium">Name</span>
      <input autoComplete="off" id="name" name="name" placeholder="Author Name" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <span className="mt-4 font-medium">Tagline</span>
      <input autoComplete="off" id="tagline" name="tagline" placeholder="Author Tagline" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <UploadImage />
      <span className="mt-4 font-medium">Image Alt</span>
      <input autoComplete="off" id="alt" name="alt" placeholder="Image Alt" className="border outline-none focus:border-black rounded mt-2 px-4 py-2" />
      <button type="submit" className="bg-white hover:bg-black text-black hover:text-white mt-8 px-3 border border-black py-1 rounded max-w-max">
        Publish &rarr;
      </button>
    </Form>
  )
}
