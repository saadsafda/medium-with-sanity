import "../styles/globals.css";
import dynamic from "next/dynamic";
import { useState, Suspense, useEffect } from "react";
import { StoreProvider } from "../utils/Store";
import Loading from "../components/Loading";
const DynamicHeader = dynamic(() => import("../components/Header"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    !loading && (
      <Suspense fallback={<Loading />}>
        <StoreProvider>
          <DynamicHeader />
          <Component {...pageProps} />
        </StoreProvider>
      </Suspense>
    )
  );
}

export default MyApp;
