import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Head } from 'next/document';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <Component {...pageProps} />
      </>
  )
}

export default MyApp
