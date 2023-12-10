import stylesheet from '@/css/tailwind.css'
import Pic from './components/Placeholder/Pic'
import Pics from './components/Placeholder/Pics'
import type { LinksFunction } from '@remix-run/node'
import { cssBundleHref } from '@remix-run/css-bundle'
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useNavigation } from '@remix-run/react'

export const links: LinksFunction = () => [...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []), { rel: 'stylesheet', href: stylesheet }]

const App = () => {
  const navigation = useNavigation()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-full flex flex-col items-center justify-start">
        <div className="w-full flex flex-col max-w-2xl px-8 py-16">
          <div className="flex flex-row items-center justify-between">
            <Link className="border hover:border-black rounded px-2 py-0.5 text-gray-800 hover:text-black" to="/">
              Home
            </Link>
            <Link className="border hover:border-black rounded px-2 py-0.5 text-gray-800 hover:text-black" to="/pics">
              View All
            </Link>
          </div>
          {navigation.location?.pathname === '/pics' ? <Pics /> : navigation.location?.pathname.includes('/pics/') ? <Pic /> : <Outlet />}
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default App
