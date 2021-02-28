import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../helpers/curved-line"),
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>Next.js Performance Comparison</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <DynamicComponentWithNoSSR />
        <header className={styles.header}>
          <h1>Next.js Performance Comparison</h1>
          <p>
            This is an experimental site to check how Next.js performs with the
            various approaches.
          </p>
        </header>
      </div>
      <div className={styles.curvedlineWrapper}>
        <hr className={styles.curvedline} />
      </div>
      <div className={styles.container}>
        <div className={styles.main}>
          <section>
            <h2>
              <Link href="/csr">
                <a>Client Side Rendering (CSR)</a>
              </Link>
            </h2>
            <p>
              Default Client Side Rendering (CSR) page. All API calls and
              JavaScript processes happen in the browsers. Although, in Next.js,
              this is not actually a pure CSR since, by default,{" "}
              <a href="https://nextjs.org/docs/basic-features/pages">
                Next.js pre-renders every page
              </a>
              . They have{" "}
              <a href="https://nextjs.org/docs/advanced-features/automatic-static-optimization">
                Automatic Static Optimization
              </a>
            </p>
          </section>
          <section>
            <h2>
              <Link href="/ssr">
                <a>Server Side Rendering (SSR)</a>
              </Link>
            </h2>
            <p>
              This SSR version is a little tweak from the CSR version. This
              version handled the API calls and pre-processed the result on the
              server-side by utilizing the <code>getServerSideProps</code>{" "}
              function.
            </p>
          </section>
          <section>
            <h2>
              <Link href="/swr">
                <a>Server Side Rendering (SSR) + SWR</a>
              </Link>
            </h2>
            <p>
              This version uses the SSR approach and{" "}
              <a href="https://swr.vercel.app/">SWR</a>, a data fetching library
              from the team behind Next.js itself. With the SWR, it can help to
              cache the data for an additional performance improvement.
            </p>
          </section>
          <section>
            <h2>
              <Link href="/optimized">
                <a>Server Side Rendering (SSR) + SWR + Optimized Image</a>
              </Link>
            </h2>
            <p>
              This version uses the SSR approach and SWR, a data fetching
              library from the team behind Next.js itself. With the SWR, it can
              cache the data for additional performance improvement.
              Additionally, this version also does an{" "}
              <a href="https://nextjs.org/docs/basic-features/image-optimization">
                image optimization
              </a>{" "}
              using the <code>&lt;Image /&gt;</code> component exported by{" "}
              <code>next/image</code>.
            </p>
          </section>
        </div>
      </div>
      <div className={styles.curvedlineWrapper}>
        <hr className={styles.curvedline} />
      </div>
      <div className={styles.container}>
        <footer className={styles.footer}>
          <a href="https://codepen.io/hazmi">Hazmi</a>
          <a href="https://github.com/hazmi/perf-comparison">Github</a>
        </footer>
      </div>
    </div>
  );
}
