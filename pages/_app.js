import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import "../styles/globals.css";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../helpers/curved-line"),
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
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
                  <li className={router.pathname === "/csr" ? "current" : ""}>
                    <Link href="/csr">
                      <a>CSR</a>
                    </Link>
                  </li>
                  <li className={router.pathname === "/ssr" ? "current" : ""}>
                    <Link href="/ssr">
                      <a>SSR</a>
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/optimized" ? "current" : ""
                    }
                  >
                    <Link href="/optimized">
                      <a>SSR + Optimized Image</a>
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
          <a href="https://codepen.io/hazmi">Hazmi</a>
          <a href="https://github.com/hazmi/perf-comparison">Github</a>
        </div>
      </footer>
    </>
  );
}

export default MyApp;
