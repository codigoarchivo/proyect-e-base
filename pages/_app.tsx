import type { AppProps } from 'next/app'

import { lightTheme } from '../themes'

import { SWRConfig } from 'swr'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { AuthProvider, CartProvider, UiProvider } from '../context'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}>
      <AuthProvider>
        <CartProvider>
          <UiProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UiProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
  )
}

export default MyApp
