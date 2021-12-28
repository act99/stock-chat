import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { store } from "../store/app/store";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo";
import SocketsProvider from "../context/socket.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <SocketsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SocketsProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
}
export default MyApp;
