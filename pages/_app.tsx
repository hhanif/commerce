import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import React from 'react'
import {
  createInstance,
  OptimizelyProvider,
  OptimizelyFeature,
  withOptimizely,
} from '@optimizely/react-sdk'

const optimizely = createInstance({
  sdkKey: 'JV1Nvp5158nZicxEyEncZ',
  datafileOptions: {
    updateInterval: 1000,
    autoUpdate: true,
    urlTemplate: 'https://cdn.optimizely.com/onboarding/%s.json',
  },
})

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <OptimizelyProvider
        optimizely={optimizely}
        user={{
          id: 'user123',
        }}
      >
        <OptimizelyFeature feature="discount">
          {(enabled) =>
            enabled
              ? 'Here is a $15 off code: SAVE15'
              : 'Here is a 20% off code: 20OFF'
          }
        </OptimizelyFeature>
      </OptimizelyProvider>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}
