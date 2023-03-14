import { ComponentLoading } from "@components/ComponentLoading";
import { DefaultLayout } from "@layouts/DefaultLayout";
import { AppScreen as AppScreenStatic } from "@screens/app";
import dynamic from "next/dynamic";

const AppScreen = dynamic<React.ComponentProps<typeof AppScreenStatic>>(
  () => import("@screens/app").then((data) => data.AppScreen),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen">
        <ComponentLoading />
      </div>
    ),
  }
);

const Home: IPageComponent = () => {
  return <AppScreen />;
};

Home.getLayout = (screen) => <DefaultLayout>{screen}</DefaultLayout>;

export default Home;
