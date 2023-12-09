import stylesheet from '~/css/tailwind.css'
import type { LinksFunction } from '@remix-run/node'
import { cssBundleHref } from '@remix-run/css-bundle'
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useNavigation } from '@remix-run/react'

export const links: LinksFunction = () => [...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []), { rel: 'stylesheet', href: stylesheet }]

const App = () => {
  const { state } = useNavigation()
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
          {state !== 'loading' ? (
            <Outlet />
          ) : (
            <div className="h-[300px] flex flex-col items-center justify-center px-4 py-2 font-semibold leading-6 text-sm text-black">
              <div className="flex flex-row items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path
                    fill="currentColor"
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Navigating...</span>
              </div>
            </div>
          )}
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default App
