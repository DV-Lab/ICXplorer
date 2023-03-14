import { ConnectButton as ConnectButtonStatic } from "@components/ConnectButton";
import DarkModeButton from "@components/DarkModeButton";
import dynamic from "next/dynamic";

const ConnectButton = dynamic<React.ComponentProps<typeof ConnectButtonStatic>>(
  () => import("@components/ConnectButton").then((data) => data.ConnectButton),
  {
    ssr: false,
  }
);

export const DefaultLayout: IComponent = ({ children }) => {
  return (
    <div className="relative">
      <div className="h-full flex flex-col">
        <div className="absolute right-0 top-0 flex items-start gap-8 m-6">
          <ConnectButton />
          <DarkModeButton className="mt-2" />
        </div>
        <div className="grow mt-20 mx-40">{children}</div>
      </div>
    </div>
  );
};
