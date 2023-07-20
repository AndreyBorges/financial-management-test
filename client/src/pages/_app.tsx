import { GlobalStyle, defaultTheme } from '@/styles'
import { Provider } from 'jotai'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,BarElement
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap' />
        <link rel='icon' href='favicon.ico' />
        <title>Gerenciamento Financeiro</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  )
}
