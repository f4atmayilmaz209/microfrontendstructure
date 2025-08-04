import 'antd/dist/reset.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';



// SSR'siz dinamik layout
const Layout = dynamic(() => import('@/components/Layout'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {

  return (

      <Layout>
        <Component {...pageProps} />
      </Layout>

  );
}

export default MyApp;