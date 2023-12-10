import Image from '~/components/Image'
import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { searchByConditions, searchByValue } from '~/lib/harper.server'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'

export async function loader() {
  return await searchByValue('*', 'id')
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData()
  const search = body.get('search') as string
  if (!search) return redirect('/pics')
  const result = await searchByConditions(
    ['name', 'tagline', 'slug', 'alt'].map((i) => ({
      search_attribute: i,
      search_value: search,
      search_type: 'contains',
    }))
  )
  return json({ search, result })
}

export default function Pics() {
  const images = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  return (
    <div className="mt-8 flex flex-col">
      <span className="text-2xl font-semibold">My Collection</span>
      <Form method="post" className="mt-8 flex flex-row items-center w-full gap-x-2">
        <input
          id="search"
          name="search"
          autoComplete="off"
          placeholder={actionData?.search || 'Search'}
          className="border outline-none w-full focus:border-black rounded px-4 py-1.5"
        />
        <button type="submit" className="bg-white hover:bg-black text-black hover:text-white px-3 border border-black py-1 rounded max-w-max">
          Search
        </button>
      </Form>
      {(actionData?.result || images)
        .filter((i: { [k: string]: string }) => i.slug && i.photographURL && i.photographWidth)
        .map((i: { [k: string]: string }, _: number) => (
          <Link className="mt-8" key={_} to={'/pics/' + i.slug}>
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
  )
}
