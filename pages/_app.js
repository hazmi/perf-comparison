import { useRouter } from 'next/router'
import Link from 'next/link'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <div>
      {router.pathname === '/' ? null : (
        <nav>
          <h3>
            <Link href="/">
              <a>Next.js Performance Comparison</a>
            </Link>
          </h3>
          <ul>
            <li className={router.pathname === '/csr' ? 'current' : ''}>
              <Link href="/csr">
                <a>CSR</a>
              </Link>
            </li>
            <li className={router.pathname === '/ssr' ? 'current' : ''}>
              <Link href="/ssr">
                <a>SSR</a>
              </Link>
            </li>
            <li className={router.pathname === '/optimized' ? 'current' : ''}>
              <Link href="/optimized">
                <a>SSR + Optimized</a>
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
