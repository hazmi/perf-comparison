import { useEffect } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import * as gtag from '../helpers/gtag'
import "../styles/globals.css";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../helpers/curved-line"),
  { ssr: false }
);

export function reportWebVitals({ id, name, label, value }) {
  // Use `window.gtag` if you initialized Google Analytics as this example:
  // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js
  window.gtag('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;900&family=Noto+Serif&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>
      <DynamicComponentWithNoSSR />
      <main id="main">
        {router.pathname === "/" ? null : (
          <header id="header">
            <div className="container">
              <h3>
                <Link href="/">
                  <a>
                    Next.js <sup>v10.0.2</sup> Performance Comparison
                  </a>
                </Link>
              </h3>
              <p>
                This is an experimental site to check how Next.js performs with
                the various approaches.
              </p>
              <nav>
                <ul>
                  <li className={router.pathname === "/default" ? "current" : ""}>
                    <Link href="/default">
                      <a>Default</a>
                    </Link>
                  </li>
                  <li className={router.pathname === "/default-optimized" ? "current" : ""}>
                    <Link href="/default-optimized">
                      <a>Default <span>+ Opt. Image</span></a>
                    </Link>
                  </li>
                  <li className={router.pathname === "/ssr" ? "current" : ""}>
                    <Link href="/ssr">
                      <a>SSR</a>
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/ssr-optimized" ? "current" : ""
                    }
                  >
                    <Link href="/ssr-optimized">
                      <a>SSR <span>+ Opt. Image</span></a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="curvedlineWrapper">
              <hr />
            </div>
          </header>
        )}
        <Component {...pageProps} />
      </main>
      <footer id="footer">
        <div className="curvedlineWrapper">
          <hr />
        </div>
        <div className="container">
          <a href="https://hazmi.id">Hazmi</a>
          <a href="https://github.com/hazmi/perf-comparison">Github</a>
        </div>
      </footer>
    </>
  );
}

export default MyApp;
