import { ConnectButton as ConnectButtonStatic } from "@components/ConnectButton";
import { CopyToClipboard } from "@components/CopyToClipBoardComponent";
import { RotatedArrowComponent } from "@components/RotatedArrowComponent";
import { LoadingSVG } from "@components/SVGIcons/LoadingSVG";
import { numberTypes } from "@configs/app";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
  Tooltip,
} from "@material-tailwind/react";
import { useAppStore, useThemeStore } from "@states/app";
import { deploySmartContract } from "@utils/icon-sdk";
import { cx } from "@utils/tools";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

const ConnectButton = dynamic<React.ComponentProps<typeof ConnectButtonStatic>>(
  () => import("@components/ConnectButton").then((data) => data.ConnectButton),
  {
    ssr: false,
  }
);

export const DeployDialogComponent: IComponent<{
  smartContract: IContract;
}> = ({ smartContract }) => {
  const { id: contractId, name, summary } = smartContract;
  const { darkMode } = useThemeStore();
  const { walletAddress } = useAppStore();
  const { deployedAddress, setDeployedAddress } = useAppStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [deploy, setDeploy] = useState<IDeploy | null>();
  const [params, setParams] = useState<IParams>({});
  const [network, setNetwork] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [missedFieldsFlags, setMissedFieldsFlags] = useState<{
    [key: string]: boolean;
  } | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [alreadyDeployedFlag, setAlreadyDeployedFlag] = useState(
    !!deployedAddress[name]
  );

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(!openDialog);
    if (!openDialog) {
      setMissedFieldsFlags(null);
    }
    setLoading(false);
  }, [openDialog, setOpenDialog, setMissedFieldsFlags]);

  useEffect(() => {
    const fetchDeploy = () => {
      fetch(`/api/deploys/${contractId}`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data: IDeploy) => {
          const tempParams: IParams = {};
          data.constructors.map((input) => {
            const { name, type } = input;
            const isNumberType = numberTypes.includes(type);

            if (isNumberType) {
              tempParams[name] = 0;
            } else {
              tempParams[name] = "";
            }
          });
          setParams(tempParams);
          setDeploy(data);
        })
        .catch((err) => {
          console.log({ err });
        });
    };
    fetchDeploy();
  }, [contractId]);

  const handleDeploy = useCallback(async () => {
    const tempMissedFieldsFlag: { [key: string]: boolean } = {};
    Object.entries(params).map((e) => (tempMissedFieldsFlag[e[0]] = !!e[1]));

    tempMissedFieldsFlag.network = network === "" ? false : true;

    setMissedFieldsFlags(tempMissedFieldsFlag);
    const check = Object.values(tempMissedFieldsFlag).includes(false);
    if (!check && deploy && network) {
      setLoading(true);
      const scoreAddress = await deploySmartContract({
        deploy,
        params,
        walletAddress,
        network,
      });
      setLoading(false);
      setDeployedAddress(deployedAddress, name, scoreAddress);
      setAlreadyDeployedFlag(true);
    }
  }, [
    name,
    deploy,
    params,
    walletAddress,
    network,
    deployedAddress,
    setDeployedAddress,
    setMissedFieldsFlags,
    setLoading,
  ]);

  const renderMenu = useMemo(
    () => (
      <Menu open={openMenu} handler={setOpenMenu} placement="bottom-end">
        <MenuHandler>
          <Button
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            size="lg"
            className="flex gap-2 items-center justify-between"
            color="gray"
          >
            Deployed{" "}
            <RotatedArrowComponent
              open={openMenu}
              strokeWidth="2.0"
              width={24}
              height={24}
            />
          </Button>
        </MenuHandler>
        <MenuList
          className="flex flex-col mr-4"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          <MenuItem
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            <CopyToClipboard text={deployedAddress[name]}>
              <Tooltip
                content="Copy contract address to clipboard"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
              >
                <Button
                  nonce={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  className="w-full hover:scale-105 text-base font-semibold tracking-normal capitalize "
                  color="indigo"
                >
                  Copy
                  <span className="lowercase"> contract address</span>
                </Button>
              </Tooltip>
            </CopyToClipboard>
          </MenuItem>
          <MenuItem
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            <div
              className="menu-item flex items-center justify-center"
              onClick={handleOpenDialog}
            >
              <Tooltip
                content="Redeploy this smart contract"
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
              >
                <Button
                  nonce={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  variant="gradient"
                  className="w-full hover:scale-105 text-base font-semibold tracking-normal capitalize"
                  color="teal"
                >
                  Redeploy
                </Button>
              </Tooltip>
            </div>
          </MenuItem>
        </MenuList>
      </Menu>
    ),
    [openMenu, name, deployedAddress, setOpenMenu, handleOpenDialog]
  );

  const renderDialog = useMemo(
    () =>
      deploy && (
        <Dialog
          open={openDialog}
          size={"md"}
          handler={handleOpenDialog}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          className={cx(
            {
              dark: darkMode === "dark",
            },
            `${
              darkMode === "dark"
                ? "bg-default border border-white"
                : "bg-secondary"
            }`,
            "px-4 absolute right-0 h-full !overflow-y-scroll !overflow-x-hidden"
          )}
        >
          <DialogHeader
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            className="text-black dark:text-white !py-8"
          >
            <div className="icon-wrapper w-[72px] h-[72px] rounded-full overflow-hidden">
              <Image
                src="/icon-logo.png"
                alt="icon logo"
                width="100%"
                height="100%"
              />
            </div>
            <div className="heading flex flex-col gap-2 mx-4 !font-serif font-semibold">
              <h1 className="text-2xl">{name}</h1>
              <p className="!text-gray-700 font-normal dark:text-darkText text-base">
                {summary}
              </p>
            </div>
          </DialogHeader>
          <DialogBody
            divider
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            className="!py-8 !text-lightText !dark:text-darkText flex flex-col gap-4 divide-y divide-blue-gray-100 !px-0"
          >
            <div className="metadata">
              <div className="heading flex flex-col gap-2 mx-4 !font-serif dark:text-white">
                <h1 className="text-2xl font-normal">Contract Metadata</h1>
                <p className="text-sm italic dark:text-darkText">
                  Settings to organize and distinguish between your different
                  contracts.
                </p>
              </div>
              <form className="mt-8 mb-2 mx-4">
                <div className="mb-2 flex flex-col gap-8">
                  {deploy.constructors.map(
                    (input: IConstructorInput, key: number) => {
                      const { type, name } = input;
                      return (
                        <div key={key}>
                          <Input
                            key={key}
                            size="lg"
                            label={input.description}
                            nonce={undefined}
                            onResize={undefined}
                            onResizeCapture={undefined}
                            type={
                              numberTypes.includes(type) ? "number" : "text"
                            }
                            value={params[name]}
                            onChange={(event) =>
                              setParams({
                                ...params,
                                [name]: event.target.value,
                              })
                            }
                            required
                            className="text-xl dark:text-white"
                          />
                          {missedFieldsFlags !== null &&
                            !missedFieldsFlags[name] && (
                              <span className="text-red-600 font-semibold ">
                                Invalid input!
                              </span>
                            )}
                        </div>
                      );
                    }
                  )}
                </div>
              </form>
            </div>
          </DialogBody>
          <DialogFooter
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            className="!py-8 !text-lightText !dark:text-darkText gap-4 border-none px-4"
          >
            <div className="flex flex-col gap-8 !font-serif text-black dark:text-white w-full">
              <div className="network-menu w-full">
                <h2 className="text-xl font-normal mb-4">Network</h2>
                <div className="">
                  <Select
                    label="Select Network"
                    nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    value={""}
                    onChange={(event) => {
                      setNetwork(event ?? "");
                    }}
                  >
                    <Option value="mainnet">Mainnet</Option>
                    <Option value="lisbon">Lisbon</Option>
                    <Option value="berlin">Berlin</Option>
                    <Option value="sejong">Sejong</Option>
                  </Select>
                  {missedFieldsFlags !== null && !missedFieldsFlags.network && (
                    <span className="mt-2 text-yellow-900 font-semibold ">
                      Please select network
                    </span>
                  )}
                </div>
              </div>
              <div>
                <span className="text-red-600 font-semibold">
                  {walletAddress
                    ? ""
                    : "You have to connect your wallet first!"}
                </span>
                {loading && (
                  <div className="flex gap-2 items-center">
                    <span className="ml-4 text-lg">Waiting...</span>
                    <LoadingSVG
                      className="fill-teal-400"
                      width={20}
                      height={20}
                    />
                  </div>
                )}
                <div
                  className={`btn-group flex justify-end gap-2 items-start h-fit ${
                    walletAddress || loading ? "mt-2.5" : ""
                  }`}
                >
                  <Button
                    variant="text"
                    color="red"
                    onClick={() => setOpenDialog(false)}
                    nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                  >
                    <span className="text-lg">Cancel</span>
                  </Button>
                  {deploy && (
                    <ConnectButton deployWallet={() => handleDeploy()} />
                  )}
                </div>

                {deployedAddress[name] !== undefined && (
                  <div className="mt-8 ml-2 text-lg font-semibold">
                    <h1>
                      Contract Address:
                      <a
                        target="_blank"
                        href={`https://tracker.${network}.icon.community/contract/${deployedAddress[name]}`}
                        className="underline text-blue-700"
                        rel="noreferrer"
                      >
                        {" "}
                        {deployedAddress[name]}
                      </a>
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </DialogFooter>
        </Dialog>
      ),
    [
      handleOpenDialog,
      darkMode,
      deploy,
      deployedAddress,
      handleDeploy,
      loading,
      missedFieldsFlags,
      name,
      network,
      openDialog,
      params,
      summary,
      walletAddress,
      setParams,
    ]
  );

  return (
    <>
      {deploy && (
        <div className="h-full">
          {deploy && alreadyDeployedFlag ? (
            renderMenu
          ) : (
            <Button
              onClick={handleOpenDialog}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              size="lg"
              variant="filled"
              className="flex gap-2 justify-between"
            >
              Deploy <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" />
            </Button>
          )}
          {renderDialog}
        </div>
      )}
    </>
  );
};
