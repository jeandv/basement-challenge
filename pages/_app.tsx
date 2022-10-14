import type { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Head from "next/head";

import theme from "../theme";
import "../css/global.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Basement Challenge - Jeandv</title>
        <meta content="Coding challenge for basement.studio." name="description" />
      </Head>
      <ChakraProvider theme={theme}>
        <Container maxWidth='container.xl'>
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </>
  );
}
export default App;
