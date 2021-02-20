import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { prepareGifList } from '../helpers/prepareGifList';
import styles from '../styles/gif.module.css'

export default function Home({ gifs }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSR Rendering with Optimized Image - Perf Comparison</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>SSR + Optimized Image</h1>
        <p>
          This SSR + Optimized Image is the SSR version of the page with the
          additional images optimization using the <code>&lt;Image /&gt;</code> component
          exported by <code>next/image</code>.
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
                <Image {...gif.imgAttr} />
                {gif.userDisplayName ? (
                  <aside className={styles.user}>
                    <Image {...gif.userImgAttr} />
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
