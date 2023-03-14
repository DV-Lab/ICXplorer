import "@styles/globals.scss";

import { MainLayout } from "@layouts/MainLayout";
import { ThemeProvider as ThemeProviderStatic } from "@material-tailwind/react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

/**
 * Default layout for page component
 */

const DefaultLayout: IComponent = ({ children }) => <>{children}</>;
const ThemeProvider = dynamic<React.ComponentProps<typeof ThemeProviderStatic>>(
  () =>
    import("@material-tailwind/react/context/theme").then(
      (data) => data.ThemeProvider
    )
);

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as IPageComponent).getLayout ||
    ((children) => <DefaultLayout>{children}</DefaultLayout>);

  const PageContent = Component as IPageComponent;

  return (
    <ThemeProvider value={undefined}>
      <MainLayout>{getLayout(<PageContent {...pageProps} />)}</MainLayout>
    </ThemeProvider>
  );
}

export default MyApp;
