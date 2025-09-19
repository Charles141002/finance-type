import { useState } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { Session } from '@supabase/supabase-js'
import { createSupabaseBrowserClient } from '../utils/supabaseClient'

interface CustomAppProps extends AppProps {
  pageProps: AppProps['pageProps'] & {
    initialSession?: Session
  }
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const [supabaseClient] = useState(() => createSupabaseBrowserClient())

  return (
    <>
      <Head>
        <style jsx global>{`
          * {
            box-sizing: border-box;
          }
          
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
          }
          
          body {
            background-color: rgba(2, 6, 23, 0.95);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          #__next {
            min-height: 100vh;
            width: 100%;
          }
          
          /* Supprimer les marges par défaut des éléments */
          h1, h2, h3, h4, h5, h6, p, ul, ol, li, div, section, article, header, footer, nav, main {
            margin: 0;
            padding: 0;
          }
          
          /* Assurer que les images ne dépassent pas */
          img {
            max-width: 100%;
            height: auto;
          }
          
          /* Styles pour les liens */
          a {
            color: inherit;
            text-decoration: none;
          }
          
          /* Supprimer les puces par défaut */
          ul, ol {
            list-style: none;
          }
          
          /* Assurer que le contenu remplit toute la largeur */
          .container, .wrapper, main, section {
            width: 100%;
            max-width: 100%;
        }
      `}</style>
    </Head>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
        <Component {...pageProps} />
      </SessionContextProvider>
    </>
  )
}
