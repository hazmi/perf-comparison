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
        <h1>Server Side Rendering (SSR)</h1>
        <p>
          This SSR version is a minor tweak from the default version. This
          version handled the API calls and pre-processed the result on the
          server-side by utilizing the
          <code>getServerSideProps</code> function. This approach has a slight
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
