import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
          <Head>
              <link rel="icon" href="https://static.vecteezy.com/system/resources/previews/001/200/449/non_2x/clock-png.png" />
          </Head>
        <Component {...pageProps} />
      </>
  )
}

export default MyApp
