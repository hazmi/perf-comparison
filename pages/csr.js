import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { prepareGifList } from '../helpers/prepareGifList';
import styles from '../styles/gif.module.css'

export default function Home() {
  const [gifs, setGifs] = useState({ data: [], containerHeight: 0 });
  
  useEffect(() => {
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=xpdrHwpGnEbznpNzYnB4bSAuDAadz8tO')
      .then(res => res.json())
      .then(res => {
        const gifs = prepareGifList(res.data);
        setGifs(gifs);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>CSR - Next.js Performance Comparison</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>Client Side Rendering (CSR)</h1>
        <p>
          Default <em>CSR</em> page. All API calls
          and JavaScript processes happen in the browsers.
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
