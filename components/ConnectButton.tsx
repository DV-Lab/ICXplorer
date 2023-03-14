import { Button, Tooltip } from "@material-tailwind/react";
import { useAppStore } from "@states/app";
import { cx, formatAddress } from "@utils/tools";
import { useState } from "react";

import { CopyToClipboard } from "./CopyToClipBoardComponent";
import { RotatedArrowComponent } from "./RotatedArrowComponent";

const btnStyles = "text-lg";

export const ConnectButton: IComponent<{
  deployWallet?: () => void;
}> = ({ deployWallet }) => {
  const { walletAddress, setWalletAddress } = useAppStore();
  const [openMenu, setOpenMenu] = useState(false);

  const triggers = {
    onClick: () => setOpenMenu((prev) => !prev),
  };

  const iconexRelayRequest = new CustomEvent<ICustomEventProps>(
    "ICONEX_RELAY_REQUEST",
    {
      detail: {
        type: "REQUEST_ADDRESS",
      },
    }
  );

  const connectWalletHandler = () => {
    if (typeof window !== "undefined") {
      window.addEventListener("ICONEX_RELAY_RESPONSE", (e) => {
        responseAddressHandler(e as CustomEvent);
      });
      window.dispatchEvent(iconexRelayRequest);
    }
  };

  const responseAddressHandler = async (event: CustomEvent) => {
    const { type, payload } = event.detail;
    if (type == "RESPONSE_ADDRESS") {
      setWalletAddress(payload);

      window.hana = {
        address: payload,
        isHanaWallet: true,
        isConnected: true,
        available: true,
      };
    }

    window.removeEventListener("ICONEX_RELAY_RESPONSE", (e) =>
      responseAddressHandler(e as CustomEvent)
    );
  };

  const disconnectWalletHandler = () => {
    setWalletAddress("");
  };

  return (
    <div>
      {walletAddress === "" ? (
        <Button
          variant="gradient"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          onClick={connectWalletHandler}
          className={cx(btnStyles)}
        >
          Connect wallet
        </Button>
      ) : (
        <div className="flex gap-4">
          {deployWallet && (
            <Button
              variant="gradient"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onClick={() => deployWallet()}
              className={cx(btnStyles, "relative w-fit h-fit")}
            >
              Deploy now
            </Button>
          )}
          <div className="custom-menu flex flex-col items-end">
            <div className="menu-handler">
              <Button
                nonce={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                {...triggers}
                variant="text"
                className="flex items-center gap-3 text-base font-semibold tracking-normal lowercase"
              >
                {formatAddress(walletAddress)}
                <RotatedArrowComponent open={openMenu} />
              </Button>
            </div>
            {openMenu && (
              <div
                className="menu-list rounded-lg w-fit mt-1 mr-8 text-lg bg-white dark:bg-transparent dark:border dark:border-gray-300 flex flex-col gap-3 py-4 px-5"
                {...triggers}
              >
                <div className="menu-item flex items-center justify-center">
                  <CopyToClipboard text={walletAddress}>
                    <Tooltip
                      content="Copy address to clipboard"
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
                        color="gray"
                      >
                        Copy
                        <span className="lowercase"> address</span>
                      </Button>
                    </Tooltip>
                  </CopyToClipboard>
                </div>
                <div
                  className="menu-item flex items-center justify-center"
                  onClick={disconnectWalletHandler}
                >
                  <Tooltip
                    content="Disconnect the wallet"
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
                      color="red"
                    >
                      Disconnect
                    </Button>
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
