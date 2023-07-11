import React, { useEffect, useState } from 'react';
import '@/scss/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';

import GeneralLayout from '@/components/layout/GeneralLayout';
import { ReduxProvider } from '@/redux/provider';
import { useRouter } from 'next/router';
import GeralLoading from '@/components/GeralLoading';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events]);

  return (
    <ReduxProvider>
      <GeneralLayout>
        {isLoading && (
          <GeralLoading />
        )}
        <Component {...pageProps} />
      </GeneralLayout>
    </ReduxProvider>
  );
}
