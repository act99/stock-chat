import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { store } from "../store/app/store";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ApolloProvider>
    </>
  );
}
export default MyApp;
