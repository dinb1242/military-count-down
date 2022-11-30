import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "../layout/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>전역일 계산기</title>
        <link
          rel="icon"
          href="https://static.vecteezy.com/system/resources/previews/001/200/449/non_2x/clock-png.png"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
