import { appUrl } from "@configs/app";
import { useThemeStore } from "@states/app";
import Image from "next/image";
import { useRouter } from "next/router";

export const SmartContractComponent: IComponent<IContract> = ({
  id,
  name,
  summary,
  version,
}) => {
  const router = useRouter();
  const { darkMode } = useThemeStore();
  return (
    <div
      className="smart-contract-component border border-gray-800 p-4 rounded-xl flex flex-col gap-6 hover:border hover:border-red-300 duration-200 cursor-pointer bg-white dark:bg-[#121212]"
      onClick={() => router.push(`${id}`)}
    >
      <div className="flex items-center gap-4">
        <div className="icon-wrapper w-[72px] h-[24px]">
          <Image
            src={darkMode === "dark" ? "/icon-dark-mode.png" : "/icon.png"}
            alt={name + "icon"}
            width={72}
            height={24}
          />
        </div>
        <h2 className="text-sm  font-semibold">{version}</h2>
      </div>
      <div>
        <h1 className="text-lg font-semibold dark:text-white">{name}</h1>
        <h2 className="mt-2 text-sm">{summary}</h2>
      </div>
      <div className="grow info flex items-end">
        <div className="grow flex gap-2 items-center">
          <div className="icon-wrapper w-[28px] h-[28px]">
            <Image
              src="/xplorer-icon.png"
              alt="xplorer icon"
              width="100%"
              height="100%"
            />
          </div>
          <a
            className="text-md hover:underline dark:text-gray-300"
            href={appUrl}
          >
            icxplorer
          </a>
        </div>
      </div>
    </div>
  );
};
