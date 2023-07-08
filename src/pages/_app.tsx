import React from 'react';
import '@/scss/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';

import GeneralLayout from '@/components/layout/GeneralLayout';
import { ReduxProvider } from '@/redux/provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <GeneralLayout>
        <Component {...pageProps} />
      </GeneralLayout>
    </ReduxProvider>
  );
}
