// import '../styles/globals.css';
//here you can implement providers etc, data management
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/layout';
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;