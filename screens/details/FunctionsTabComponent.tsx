import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import { TextMarkdownComponent } from "@components/TextMarkdownComponent";
import { numberTypes } from "@configs/app";
import {
  Button,
  Chip,
  Input,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useAppStore } from "@states/app";
import { readSmartContract, writeSmartContract } from "@utils/icon-sdk";
import { cx, formatAddress, isIWriteMethod } from "@utils/tools";
import { ReactNode, useCallback, useEffect, useState } from "react";

import { interactTable, leftSidebar, tabBodyStyles } from "./styles";

export const FunctionsTabComponent: IComponent<{
  contractName?: string;
  functions?: IFunctions;
  isSelected: boolean;
}> = ({ contractName, functions, isSelected }) => {
  const network = "lisbon";
  const [selectedTab, setSelectedTab] = useState<string>("write");
  const [callable, setCallable] = useState<IWriteMethod | IReadMethod | null>(
    functions && functions.writeMethods && functions.writeMethods.length > 0
      ? functions.writeMethods[0]
      : null
  );
  const [params, setParams] = useState<IParams>({});
  const [result, setResult] = useState<{ [key: string]: string }>({});
  const [isBadReq, setIsBadReq] = useState(false);
  const { deployedAddress, walletAddress } = useAppStore();
  const [missedFieldsFlags, setMissedFieldsFlags] = useState<{
    [key: string]: boolean;
  } | null>(null);

  const handleTabPanel = (method: IWriteMethod | IReadMethod) => {
    setIsBadReq(false);
    const tempParams: IParams = {};
    method.inputs.map((input) => {
      const { name, type } = input;
      const isNumberType = numberTypes.includes(type);

      if (isNumberType) {
        tempParams[name] = 0;
      } else {
        tempParams[name] = "";
      }
    });

    setParams(tempParams);
    setCallable(method);
  };

  const handleCallButton = async (
    callable: IWriteMethod | IReadMethod,
    contractName: string
  ) => {
    const tempParams = { ...params };
    const tempMissedFieldsFlag: { [key: string]: boolean } = {};
    Object.entries(params).map((e) => (tempMissedFieldsFlag[e[0]] = !!e[1]));

    setIsBadReq(false);
    setResult({ ...result, [callable.name]: "" });

    setMissedFieldsFlags(tempMissedFieldsFlag);
    const check = Object.values(tempMissedFieldsFlag).includes(false);

    if (check) return;

    callable.inputs.map(({ type, name }) => {
      if (type.includes("byte")) {
        tempParams[name] = Buffer.from(tempParams[name] as string).toString(
          "hex"
        );
      }
    });
    let response;

    try {
      if (isIWriteMethod(callable)) {
        response = await writeSmartContract<string>({
          network,
          walletAddress,
          contractAddress: deployedAddress[contractName],
          method: callable.name,
          params: tempParams,
        });
      } else {
        response = await readSmartContract<string>({
          network,
          walletAddress,
          contractAddress: deployedAddress[contractName],
          method: callable.name,
          params: tempParams,
        });
      }
      if (numberTypes.includes(callable.returnType)) {
        response = parseInt(response, 16).toString();
      }

      setResult({ ...result, [callable.name]: response });
    } catch (error) {
      setIsBadReq(true);
    }
  };

  const renderTabs: () => { name: string; body: ReactNode }[] | undefined =
    useCallback(() => {
      if (functions?.writeMethods) {
        const { writeMethods, readMethods } = functions;
        return [
          {
            name: "write",
            body: (
              <TabPanel value="write" key="write">
                {writeMethods ? (
                  writeMethods.length > 0 ? (
                    <ul>
                      {writeMethods.map((m, idx) => {
                        return (
                          <li
                            key={idx}
                            className={` dark:text-darkText text-lg cursor-pointer hover:underline hover:underline-offset-2 !font-serif font-semibold ${
                              callable !== null && m.name === callable.name
                                ? "text-black dark:!text-white"
                                : ""
                            }`}
                            onClick={() => handleTabPanel(m)}
                          >
                            {m.name}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div>No writable methods</div>
                  )
                ) : (
                  <LoadingSVG className="fill-teal-400" />
                )}
              </TabPanel>
            ),
          },
          {
            name: "read",
            body: (
              <TabPanel value="read" key="read">
                {readMethods ? (
                  readMethods.length > 0 ? (
                    <ul>
                      {readMethods.map((m, idx) => {
                        return (
                          <li
                            key={idx}
                            className={`dark:text-darkText text-lg cursor-pointer hover:underline hover:underline-offset-2 !font-serif font-semibold ${
                              callable !== null && m.name === callable.name
                                ? "text-black dark:!text-white"
                                : ""
                            }`}
                            onClick={() => {
                              handleTabPanel(m);
                            }}
                          >
                            {m.name}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div>No readable methods</div>
                  )
                ) : (
                  <LoadingSVG className="fill-teal-400" />
                )}
              </TabPanel>
            ),
          },
        ];
      }
    }, [callable, functions]);

  useEffect(() => setMissedFieldsFlags(null), [callable, isSelected]);

  return functions?.writeMethods || functions?.readMethods ? (
    <div className={cx(interactTable)}>
      <div className={cx(leftSidebar)}>
        <Tabs value={selectedTab} className="px-4 py-2">
          {renderTabs() && (
            <TabsHeader
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              className="text-lg font-semibold bg-white dark:bg-default"
            >
              {renderTabs() &&
                renderTabs()?.map(({ name }) => {
                  return (
                    <Tab
                      key={name}
                      value={name}
                      nonce={undefined}
                      onResize={undefined}
                      onResizeCapture={undefined}
                      className={`grow text-base bg-transparent dark:text-white  mx-2 !w-fit px-4 
                   ${
                     selectedTab === name
                       ? "border-b-2 border-b-gray-400 dark:border-b-gray-300 "
                       : ""
                   }`}
                      onClick={() => setSelectedTab(name)}
                    >
                      <p className="!font-serif">
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </p>
                    </Tab>
                  );
                })}
            </TabsHeader>
          )}
          {renderTabs() && (
            <TabsBody
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              {renderTabs()?.map((t) => t.body)}
            </TabsBody>
          )}
        </Tabs>
      </div>
      {callable && (
        <div className={cx(tabBodyStyles)}>
          <>
            <div className="pt-4 pb-6 border-b border-gray-300 !font-serif">
              <div className="flex items-center gap-2">
                <span className="text-black dark:text-white font-base text-3xl mr-1">
                  {callable.name.charAt(0).toUpperCase() +
                    callable.name.slice(1)}
                </span>{" "}
                <span className="text-2xl">({callable.name})</span>
                <Chip
                  color="teal"
                  value={
                    isIWriteMethod(callable)
                      ? callable.payable
                        ? "payable"
                        : "nonpayable"
                      : callable.pure
                      ? "pure"
                      : "view"
                  }
                  variant="gradient"
                />
              </div>
              {callable.description && (
                <TextMarkdownComponent text={callable.description} />
              )}
            </div>
            {callable.inputs.length > 0 && (
              <>
                <h1 className="mt-4 text-black dark:text-white text-2xl">
                  Inputs
                </h1>
                <div className="flex flex-col items-center text-center text-lg py-4">
                  <table className="w-[75%]">
                    <thead>
                      <tr>
                        <th>NAME</th>
                        <th>TYPE</th>
                      </tr>
                    </thead>
                    <tbody className="p-4">
                      {callable.inputs.map(({ name, type }, idx) => (
                        <tr key={idx} className="">
                          <td className="p-3 text-left flex flex-col gap-2">
                            <Input
                              variant="standard"
                              size="lg"
                              label={name}
                              value={params[name] || ""}
                              onChange={(event) =>
                                setParams({
                                  ...params,
                                  [name]: event.target.value,
                                })
                              }
                              type={
                                numberTypes.includes(type) ? "number" : "text"
                              }
                              disabled={
                                contractName && deployedAddress[contractName]
                                  ? false
                                  : true
                              }
                              nonce={undefined}
                              onResize={undefined}
                              onResizeCapture={undefined}
                              className="text-lg"
                            />
                            {missedFieldsFlags !== null &&
                              !missedFieldsFlags[name] && (
                                <span className="text-sm text-red-600">
                                  Not empty
                                </span>
                              )}
                          </td>
                          <td className="p-3 pl-20 pt-8  text-left">
                            <span className="mx-2 bg-gray-400 dark:bg-gray-700 dark:text-gray-400 p-2 rounded-lg text-base italic text-black font-normal">
                              {type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {contractName && (
              <div className="grow flex flex-col">
                <div className="w-full flex justify-center items-center text-lg mt-10">
                  <Button
                    disabled={deployedAddress[contractName] ? false : true}
                    onClick={async () => {
                      handleCallButton(callable, contractName);
                    }}
                    nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    size="lg"
                  >
                    call
                  </Button>
                </div>
                {isBadReq ? (
                  <div className="mt-4 grow min-h-[80px] flex items-start font-serif text-red-500 text-xl">
                    <h1>Error: Please check your inputs again!</h1>
                  </div>
                ) : (
                  <div className="mt-4 grow min-h-[80px] flex items-start font-serif text-black dark:text-white text-xl">
                    <h1 className="">Result:</h1>
                    <div className="truncate ml-4 flex items-center gap-3 text-xl font-semibold tracking-normal">
                      {isIWriteMethod(callable) ? (
                        <a
                          target="_blank"
                          className="underline text-lg text-blue-700 hover:text-blue-500"
                          title={result[callable.name]}
                          href={`https://tracker.${network}.icon.community/transaction/${
                            result[callable.name]
                          }`}
                          rel="noreferrer"
                        >
                          {result[callable.name] &&
                            formatAddress(result[callable.name])}
                        </a>
                      ) : (
                        result[callable.name]
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        </div>
      )}
    </div>
  ) : (
    <div className="mt-10 mx-4 text-xl font-normal">No function to display</div>
  );
};
