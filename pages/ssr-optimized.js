import Head from "next/head";
import Image from "next/image";
import MobileDetect from "mobile-detect";
import { prepareGifList } from "../helpers/prepareGifList";
import styles from "../styles/gif.module.css";

export default function Optimized({ gifs }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSR + Optimized Image in Next.js v10.0.2 Performance Comparison</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1>Server Side Rendering (SSR) + Optimized Image</h1>
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
        </div>
        <div className={`${styles.curvedLineWrapper} curvedlineWrapper`}>
          <hr />
        </div>
        <p>
          This version uses the SSR. Additionally, this version also does an{" "}
          <a href="https://nextjs.org/docs/basic-features/image-optimization">
            image optimization
          </a>{" "}
          using the <code>&lt;Image /&gt;</code> component exported by{" "}
          <code>next/image</code>.
        </p>
      </header>
      <main>
        <h2>Trending GIF's in <a href="https://giphy.com">GIPHY</a></h2>
        <div
          className={styles.wrapper}
          style={{
            height: gifs.containerHeight,
          }}
        >
          {gifs.data.map((gif) => {
            return (
              <section key={gif.id} className={styles.gif} style={gif.style}>
                <h4>{gif.title}</h4>
                <Image {...gif.imgAttr} />
                {gif.userDisplayName ? (
                  <aside className={styles.user}>
                    <Image {...gif.userImgAttr} />
                    <h5>{gif.userDisplayName}</h5>
                  </aside>
                ) : null}
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "https://api.giphy.com/v1/gifs/trending?api_key=xpdrHwpGnEbznpNzYnB4bSAuDAadz8tO"
  );
  const rawGifs = await res.json();

  const md = new MobileDetect(context.req.headers["user-agent"]);
  let gifs;

  if (md.mobile()) {
    gifs = prepareGifList(rawGifs.data, {
      gutter: 14,
      width: 158,
      defaultColumn: [0, 0],
    });
  } else {
    gifs = prepareGifList(rawGifs.data);
  }

  return {
    props: {
      gifs,
    },
  };
}
