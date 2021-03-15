import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Head>
            <title>Next.js v10.0.2 Performance Comparison</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <h1>Next.js <sup>v10.0.2</sup> Performance Comparison</h1>
          <p>
            This is an experimental site to check how Next.js performs with the
            various approaches.
          </p>
        </div>
        <div className={`${styles.curvedLineWrapper} curvedlineWrapper`}>
          <hr />
        </div>
      </header>
      <div className={styles.main}>
        <div className={styles.container}>
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
              .
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
              <Link href="/optimized">
                <a>Server Side Rendering (SSR) + Optimized Image</a>
              </Link>
            </h2>
            <p>
              This version uses the SSR.
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
    </>
  );
}
