import { ComponentLoading } from "@components/ComponentLoading";
import { ScreenLayout } from "@layouts/ScreenLayout";
import { DetailsScreen as DetailsScreenStatic } from "@screens/details";
import dynamic from "next/dynamic";

const DetailsScreen = dynamic<React.ComponentProps<typeof DetailsScreenStatic>>(
  () => import("@screens/details").then((data) => data.DetailsScreen),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen">
        <ComponentLoading />
      </div>
    ),
  }
);

const Details: IPageComponent = () => {
  return <DetailsScreen />;
};

Details.getLayout = (screen) => <ScreenLayout>{screen}</ScreenLayout>;

export default Details;
