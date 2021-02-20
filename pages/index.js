import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Performance Comparison</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <main className={styles.main}>
          <h1>Next.js Performance Comparison</h1>
          <section>
            <h2>
              <Link href="/csr">
                <a>Client Side Rendering (CSR)</a>
              </Link>
            </h2>
            <p>
              Default <em>CSR</em> page. All API calls
              and JavaScript processes happen in the browsers.
            </p>
          </section>
          <section>
            <h2>
              <Link href="/ssr">
                <a>Server Side Rendering (SSR)</a>
              </Link>
            </h2>
            <p>
              This <em>SSR</em> version is a little tweak from the CSR version. This
              version handled the API calls and pre-processed the result on the
              server-side by using the <code>getServerSideProps</code> function.
            </p>
          </section>
          <section>
            <h2>
              <Link href="/optimized">
                <a>SSR + Optimized Image</a>
              </Link>
            </h2>
            <p>
              This SSR + Optimized Image is the SSR version of the page with the
              additional images optimization using the <code>&lt;Image /&gt;</code> component
              exported by <code>next/image</code>.
            </p>
          </section>
        </main>

        <footer className={styles.footer}>
          <a href="https://codepen.io/hazmi">Hazmi</a>
        </footer>
      </div>
    </div>
  );
}
