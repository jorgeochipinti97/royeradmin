import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import { UserProvider } from '@auth0/nextjs-auth0/client';




function MyApp({ Component, pageProps }: AppProps) {



  return (
    <>


      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </ThemeProvider>
      </SWRConfig>


    </>



  )
}

export default MyApp
