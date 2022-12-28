import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "../layout/layout";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{ page }</Layout>)

  return (
    <>
      <Head>
        <title>전역일 계산기</title>
        <link
          rel="icon"
          href="https://static.vecteezy.com/system/resources/previews/001/200/449/non_2x/clock-png.png"
        />
      </Head>
      { getLayout(<Component {...pageProps} />) }
    </>
  );
}

export default MyApp;
