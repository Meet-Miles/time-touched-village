import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import Head from 'next/head'

const platform = localFont({
  src: [
    {
      path: './Platform-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Platform-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-platform'
})

export default function App({ Component, pageProps }: AppProps) {
  return <main className={`${platform.variable}`}>
    <Head>
      <title>Time Touched Village</title>
      <link rel="icon" href="/favicon.png" />
    </Head>
    <Component {...pageProps} />
  </main>
}
