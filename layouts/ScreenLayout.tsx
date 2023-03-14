import { ConnectButton as ConnectButtonStatic } from "@components/ConnectButton";
import DarkModeButton from "@components/DarkModeButton";
import { HomeSVG } from "@components/SVGIcons/HomeSVG";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ConnectButton = dynamic<React.ComponentProps<typeof ConnectButtonStatic>>(
  () => import("@components/ConnectButton").then((data) => data.ConnectButton),
  {
    ssr: false,
  }
);

export const ScreenLayout: IComponent = ({ children }) => {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col relative">
      <div className="py-8 px-8 z-30 w-fit" onClick={() => router.push("/")}>
        <HomeSVG
          className="cursor-pointer hover:scale-105 duration-150  dark:text-white"
          width={28}
          height={28}
        />
      </div>
      <div className="absolute right-0 top-0 flex items-start gap-8 m-6">
        <ConnectButton />
        <DarkModeButton className="mt-2" />
      </div>
      <div className="grow">{children}</div>
    </div>
  );
};
