import type { AppProps } from "next/app";
// import "@shopify/polaris/build/esm/styles.css";

import Layout from "../components/navigation/Layout";
import "../styles/app.scss";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default App;
