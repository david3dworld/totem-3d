/* eslint-disable @next/next/inline-script-id */
import '../styles/globals.css'
import { Provider } from "react-redux";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import store from "../redux/store"
import { PersistGate } from 'redux-persist/integration/react'
import {persistor} from "../redux/store"
import { MoralisProvider } from "react-moralis";
import Script from "next/script"
import Head from 'next/head'
import 'react-notifications/lib/notifications.css';

function MyApp({ Component, pageProps }) {
  // const url = "https://tu967vbmhkyy.usemoralis.com:2053/server";
  // const appId = "51REoBzqidhjgorRploUJedavk8OjB3YLgjvTBnF";
  const url = "https://3plrziv1chui.usemoralis.com:2053/server";
  const appId = "fF0AqfcxeUp6VHjqCQ81DOzewPchpGJjxawYmhWM";

  return (
  <>
  <Head>
    <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </Head>
  <MoralisProvider appId={appId} serverUrl={url}>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Script
    dangerouslySetInnerHTML={{ __html : `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-P42WPBW');` }} />
  <Component {...pageProps} />
  </PersistGate>
  </Provider> 
    <NotificationContainer/>
  </MoralisProvider>
  </>

  )
}

export default MyApp
