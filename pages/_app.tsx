import "../common/styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

import ModalManager from "@/common/components/modal/components/ModalManager";

import "react-toastify/dist/ReactToastify.min.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Whizle | Whiz Through Ideas. Together.</title>
        <meta
          name="description"
          content="Whizle - A real-time collaborative whiteboard application. Whiz Through Ideas. Together. Created by Prathamesh Bhamare & Zulfikar Parihar."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Prathamesh Bhamare, Zulfikar Parihar" />
        <meta
          property="og:title"
          content="Whizle | Whiz Through Ideas. Together."
        />
        <meta
          property="og:description"
          content="Real-time collaborative whiteboard application for seamless idea sharing and brainstorming."
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <ToastContainer />
        <ModalManager />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
};

export default App;
