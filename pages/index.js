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
          <h1>
            Next.js <sup>v10.0.2</sup> Performance Comparison
          </h1>
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
            <header>
              <h2>
                <Link href="/default">
                  <a>Default (CSR with Pre-renders)</a>
                </Link>
              </h2>
              <div className={styles.perf}>
                <p className="hide">Performance score:</p>
                <ul>
                  <li className={styles.perf_need_improvement}>
                    <a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fnextjs-performance.hazmi.id%2Fdefault&tab=mobile">
                      <span className={styles.perf_label}>Mobile</span>
                      <span className={styles.perf_score}>69</span>
                      <span className={styles.perf_total}>/100</span>
                    </a>
                  </li>
                  <li className={styles.perf_need_improvement}>
                    <a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fnextjs-performance.hazmi.id%2Fdefault&tab=desktop">
                      <span className={styles.perf_label}>Desktop</span>
                      <span className={styles.perf_score}>74</span>
                      <span className={styles.perf_total}>/100</span>
                    </a>
                  </li>
                </ul>
              </div>
            </header>
            <div className={`${styles.curvedLineWrapper} curvedlineWrapper`}>
              <hr />
            </div>
            <p>
              By default,{" "}
              <a href="https://nextjs.org/docs/basic-features/pages">
                Next.js pre-renders every page
              </a>
              . They have{" "}
              <a href="https://nextjs.org/docs/advanced-features/automatic-static-optimization">
                Automatic Static Optimization
              </a>
              . In this implementation, the API call is happening in the
              browsers. P re-rendering will give the page a better performance.
            </p>
          </section>
          <section>
            <header>
              <h2>
                <Link href="/default-optimized">
                  <a>Default (CSR with Pre-renders) + Image Optmization</a>
                </Link>
              </h2>
              <div className={styles.perf}>
                <p className="hide">Performance score:</p>
                <ul>
                  <li className={styles.perf_good}>
                    <a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fnextjs-performance.hazmi.id%2Fdefault-optimized&tab=mobile">
                      <span className={styles.perf_label}>Mobile</span>
                      <span className={styles.perf_score}>92</span>
                      <span className={styles.perf_total}>/100</span>
                    </a>
                  </li>
                  <li className={styles.perf_good}>
                    <a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fnextjs-performance.hazmi.id%2Fdefault-optimized&tab=desktop">
                      <span className={styles.perf_label}>Desktop</span>
                      <span className={styles.perf_score}>97</span>
                      <span className={styles.perf_total}>/100</span>
                    </a>
                  </li>
                </ul>
              </div>
            </header>
            <div className={`${styles.curvedLineWrapper} curvedlineWrapper`}>
              <hr />
            </div>
            <p>
              This version uses the Default (CSR with Pre-renders) version.
              Additionally, this version does an{" "}
              <a href="https://nextjs.org/docs/basic-features/image-optimization">
                image optimization
              </a>{" "}
              using the <code>&lt;Image /&gt;</code> component exported by{" "}
              <code>next/image</code>.
            </p>
          </section>
          <section>
            <header>
              <h2>
                <Link href="/ssr">
                  <a>Server Side Rendering (SSR)</a>
                </Link>
              </h2>
              <div className={styles.perf}>
                <p className="hide">Performance score:</p>
                <ul>
                  <li className={styles.perf_need_improvement}>
                    <a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fnextjs-performance.hazmi.id%2Fssr&tab=mobile">
                      <span className={styles.perf_label}>Mobile</span>
                      <span className={styles.perf_score}>65</span>
                      <span className={styles.perf_total}>/100</span>
                    </a>
                  </li>
                  <li className={styles.perf_need_improvement}>
                    <a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fnextjs-performance.hazmi.id%2Fssr&tab=desktop">
                      <span className={styles.perf_label}>Desktop</span>
                      <span className={styles.perf_score}>76</span>
                      <span className={styles.perf_total}>/100</span>
                    </a>
                  </li>
                </ul>
              </div>
            </header>
            <div className={`${styles.curvedLineWrapper} curvedlineWrapper`}>
              <hr />
            </div>
            <p>
              This SSR version is a minor tweak from the default version. This
              version handled the API calls and pre-processed the result on the
              server-side by utilizing the <code>getServerSideProps</code>{" "}
              function. This approach has a slight drawback as the{" "}
              <code>getServerSideProps</code> will{" "}
              <a href="https://nextjs.org/docs/advanced-features/automatic-static-optimization#how-it-works">
                cancel the pre-renders behavior
              </a>
              .
            </p>
          </section>
          <section>
            <header>
              <h2>
                <Link href="/ssr-optimized">
                  <a>Server Side Rendering (SSR) + Optimized Image</a>
                </Link>
              </h2>
              <div className={styles.perf}>
                <p className="hide">Performance score:</p>
                <ul>
                  <li className={styles.perf_good}>
                    <a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fnextjs-performance.hazmi.id%2Fssr-optimized&tab=mobile">
                      <span className={styles.perf_label}>Mobile</span>
                      <span className={styles.perf_score}>93</span>
                      <span className={styles.perf_total}>/100</span>
                    </a>
                  </li>
                  <li className={styles.perf_good}>
                    <a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fnextjs-performance.hazmi.id%2Fssr-optimized&tab=desktop">
                      <span className={styles.perf_label}>Desktop</span>
                      <span className={styles.perf_score}>99</span>
                      <span className={styles.perf_total}>/100</span>
                    </a>
                  </li>
                </ul>
              </div>
            </header>
            <div className={`${styles.curvedLineWrapper} curvedlineWrapper`}>
              <hr />
            </div>
            <p>
              This version uses the SSR version. Additionally, this version also
              does an{" "}
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
