import { useEffect, useState } from "react";
import Head from "next/head";
import MobileDetect from "mobile-detect";
import { prepareGifList } from "../helpers/prepareGifList";
import styles from "../styles/gif.module.css";

export default function CSR() {
  const [gifs, setGifs] = useState({ data: [], containerHeight: 0 });

  useEffect(() => {
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=xpdrHwpGnEbznpNzYnB4bSAuDAadz8tO"
    )
      .then((res) => res.json())
      .then((rawGifs) => {
        const md = new MobileDetect(navigator.userAgent);
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
        setGifs(gifs);
      });
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>Default (CSR with Pre-renders) in Next.js v10.0.2 Performance Comparison</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className={styles.header}>
          <h1>Default (CSR with Pre-renders)</h1>
          <p>
            By default,{" "}
            <a href="https://nextjs.org/docs/basic-features/pages">
              Next.js pre-renders every page
            </a>
            . They have{" "}
            <a href="https://nextjs.org/docs/advanced-features/automatic-static-optimization">
              Automatic Static Optimization
            </a>
            . In this implementation, the API call is happening in the browsers.
            P re-rendering will give the page a better performance.
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
    </div>
  );
}
