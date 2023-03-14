import { DeployDialogComponent } from "@components/DeployDialogComponent";
import { ArrowLeftSVG } from "@components/SVGIcons/ArrowLeftSVG";
import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { EventsTabComponent } from "./EventsTabComponent";
import { FunctionsTabComponent } from "./FunctionsTabComponent";
import { SourcesTabComponent } from "./SourcesTabComponent";

export const DetailsScreen: IComponent = () => {
  const [smartContract, setSmartContract] = useState<IContract | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("functions");
  const smartContractID = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchSmartContracts = () => {
      fetch(`/api/contracts/${smartContractID}`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          setSmartContract(data);
        });
    };
    if (smartContractID) {
      fetchSmartContracts();
    }
  }, [smartContractID]);
  const router = useRouter();
  const renderInfo = useMemo(() => {
    return (
      <div className="info border border-gray-300 rounded-lg p-8 text-lg bg-white dark:bg-transparent">
        {
          <p className="text-lightText dark:text-darkText leading-8">
            {smartContract?.description ?? ""}
          </p>
        }
        <div className="mt-8 flex flex-col gap-2">
          {smartContract?.useCases && smartContract.useCases.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold">Use cases and examples</h3>
              <h4 className="text-lightText dark:text-darkText">
                You could use the &quot;{smartContract?.name}&quot; contract to:
              </h4>
              <ul className="pl-8 list-disc text-lightText dark:text-darkText">
                {smartContract.useCases.map((uc, idx) => (
                  <li key={idx}>{uc}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="mt-8">
          {smartContract?.resources && smartContract.resources.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold">Resources</h3>
              <ul className="pl-8 list-disc text-lightText dark:text-darkText">
                {smartContract.resources.map(({ link, name }, idx) => (
                  <li key={idx}>
                    <a
                      className="text-blue-500 underline underline-offset-2"
                      href={link}
                    >
                      {name}{" "}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    );
  }, [smartContract]);

  const renderLib = useCallback(() => {
    const tabs: {
      name: string;
      body: ReactNode;
    }[] = [
      {
        name: "functions",
        body: (
          <TabPanel className="h-full" key="functions" value="functions">
            <FunctionsTabComponent
              contractName={smartContract?.name}
              functions={smartContract?.functions}
              isSelected={selectedTab === "functions"}
            />
          </TabPanel>
        ),
      },
      {
        name: "events",
        body: (
          <TabPanel className="h-full" key="events" value="events">
            <EventsTabComponent events={smartContract?.events} />
          </TabPanel>
        ),
      },
      {
        name: "sources",
        body: (
          <TabPanel className="h-full" key="sources" value="sources">
            <SourcesTabComponent sources={smartContract?.sources} />
          </TabPanel>
        ),
      },
    ];

    return (
      <div className="min-h-[961px] lib mt-10 mb-48 border border-gray-300 rounded-lg p-6 text-lg bg-white dark:bg-default flex flex-col">
        <Tabs value={selectedTab} className="h-full flex flex-col grow">
          <TabsHeader
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            className="flex text-lg font-semibold bg-white dark:bg-default"
          >
            {tabs.map(({ name }) => {
              return (
                <Tab
                  key={name}
                  value={name}
                  nonce={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  className={`text-xl bg-transparent dark:text-white border-b-2 !w-fit px-2 mx-4 
                  border-b-gray-400 dark:border-b-gray-300 !font-serif  ${
                    selectedTab === name
                      ? "border-b-red-300 dark:border-b-red-300"
                      : ""
                  }`}
                  onClick={() => setSelectedTab(name)}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Tab>
              );
            })}
          </TabsHeader>
          <TabsBody
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            className="grow"
          >
            {tabs.map((t) => t.body)}
          </TabsBody>
        </Tabs>
      </div>
    );
  }, [smartContract, selectedTab]);

  return (
    <div className="min-h-screen text-black dark:text-white mx-96 px-2 py-10 font-serif">
      {smartContract !== null ? (
        <>
          <div className="flex items-center gap-2 pr-4">
            <div className="grow flex items-center">
              <div
                className="cursor-pointer p-1"
                onClick={() => router.push("/")}
              >
                <ArrowLeftSVG
                  width={32}
                  height={32}
                  className="hover:stroke-black dark:hover:stroke-red-300"
                />
              </div>
              <div className="icon-wrapper w-[80px] h-[80px] rounded-full overflow-hidden">
                <Image
                  src="/icon-logo.png"
                  alt="icon logo"
                  width={80}
                  height={80}
                />
              </div>

              <div className="heading flex flex-col gap-2 mx-4">
                <h1 className="text-4xl font-semibold">
                  {smartContract?.name}
                </h1>
                <p className="text-lg ">{smartContract?.summary}</p>
              </div>
            </div>
            <div>
              {smartContract && (
                <DeployDialogComponent smartContract={smartContract} />
              )}
            </div>
          </div>
          <main className="flex flex-col gap-2 pt-10 ">
            {renderInfo}
            {renderLib()}
          </main>
        </>
      ) : (
        <div className="h-[60vh] flex justify-center items-center">
          <LoadingSVG width={120} height={120} className="fill-teal-400" />
        </div>
      )}
    </div>
  );
};
