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
        <h1>Server Side Rendering (SSR) Page</h1>
        <Link href="/csr">
          <a>Go to Client Side Rendering (CSR) Page</a>
        </Link> 
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
        <p>Hazmi</p>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=xpdrHwpGnEbznpNzYnB4bSAuDAadz8tO')
  const rawGifs = await res.json()

  const gifs = prepareGifList(rawGifs.data);
  return {
    props: {
      gifs,
    },
  }
}
