import Head from "next/head";
import MobileDetect from "mobile-detect";
import { prepareGifList } from "../helpers/prepareGifList";
import styles from "../styles/gif.module.css";

export default function SSR({ gifs }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSR in Next.js v10.0.2 Performance Comparison</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1>Server Side Rendering (SSR)</h1>
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
        </div>
        <div className={`${styles.curvedLineWrapper} curvedlineWrapper`}>
          <hr />
        </div>
        <p>
          This SSR version is a minor tweak from the default version. This
          version handled the API calls and pre-processed the result on the
          server-side by utilizing the <code>getServerSideProps</code> function. This approach has a slight
          drawback as the <code>getServerSideProps</code> will{" "}
          <a href="https://nextjs.org/docs/advanced-features/automatic-static-optimization#how-it-works">
            cancel the pre-renders behavior
          </a>
          .
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
                <img {...gif.imgAttr} />
                {gif.userDisplayName ? (
                  <aside className={styles.user}>
                    <img {...gif.userImgAttr} />
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
      gutter: 6,
      width: 162,
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
