import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <div>
      <Head>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;900&family=Noto+Serif&family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </Head>
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
