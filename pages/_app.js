import { createContext, useEffect, useLayoutEffect } from "react";
import "../styles/normalize.css";
import "../styles/style.scss";
import { GlobalProvider } from "../contexts/GlobalContext";
import { PageTransitionProvider } from "../components/PageLoader";
import { useRouter } from "next/router";
import PageTransitionLayout from "../components/PageTransitionLayout";

export const GlobalContext = createContext({});

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <PageTransitionProvider>
        <PageTransitionLayout>
          <Component {...pageProps} />
        </PageTransitionLayout>
      </PageTransitionProvider>
    </GlobalProvider>
  );
}

export default MyApp;
