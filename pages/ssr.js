import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { prepareGifList } from '../helpers/prepareGifList';
import styles from '../styles/gif.module.css'

export default function Home({ gifs }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSR Rendering - Perf Comparison</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>Server Side Rendering (SSR)</h1>
        <p>
          This <em>SSR</em> version is a little tweak from the CSR version. This
          version handled the API calls and pre-processed the result on the
          server-side by using the <code>getServerSideProps</code> function.
        </p>
      </header>
      <main>
        <h2>Trending GIF's in GIPHY</h2>
        <div
          className={styles.wrapper}
          style={{
            height: gifs.containerHeight
          }}
        >
          {gifs.data.map((gif) => {
            return (
              <section
                key={gif.id}
                className={styles.gif}
                style={gif.style}
              >
                <h4>{gif.title}</h4>
                <img {...gif.imgAttr} />
                {gif.userDisplayName ? (
                  <aside className={styles.user}>
                    <img {...gif.userImgAttr} />
                    <h5>{gif.userDisplayName}</h5>
                  </aside>
                ) : null}
              </section>
            )
          })}
        </div>
      </main>
      <footer>
        <p>This is the end of the page.</p>
        <p><a href="https://codepen.io/hazmi">Hazmi</a></p>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=xpdrHwpGnEbznpNzYnB4bSAuDAadz8tO')
  const rawGifs = await res.json()

  const gifs = prepareGifList(rawGifs.data);
  return {
    props: {
      gifs,
    },
  }
}
