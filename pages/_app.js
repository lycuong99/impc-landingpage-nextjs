import { createContext,} from "react";
import "../styles/normalize.css";
import "../styles/style.scss";
import { GlobalProvider } from "../contexts/GlobalContext";
import { PageTransitionProvider } from "../components/PageLoader";
import PageTransitionLayout from "../components/PageTransitionLayout";
import App from "next/app";
import ContentProvider from "../components/ContentProvider";
import { fetchFooter, fetchHeader } from "../services";
export const GlobalContext = createContext({});

function MyApp({ Component, pageProps, headerContent, footerContent }) {

  return (
    <GlobalProvider>
      <ContentProvider footerContent={footerContent} headerContent={headerContent}>
        <PageTransitionProvider>
          <PageTransitionLayout>
            <Component {...pageProps} />
          </PageTransitionLayout>
        </PageTransitionProvider>
      </ContentProvider>
    </GlobalProvider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  let locale = ctx.router.locale || "en";


  const appProps = await App.getInitialProps(ctx);

  const headerContent = await fetchHeader(locale);
  const footerContent = await fetchFooter(locale);

  // Fetch global site settings from Strapi

  // Pass the data to our page via props
  return {
    ...appProps,
    pageProps: { global: { headerContent, footerContent } },
    headerContent,
    footerContent,
  };
};

export default MyApp;
