import { networkMappingToId } from "@configs/app";
import IconService from "icon-sdk-js";
import { CallTransaction } from "icon-sdk-js/build/builder/transaction/CallTransaction";
import { DeployTransaction } from "icon-sdk-js/build/builder/transaction/DeployTransaction";

const { IconBuilder, IconConverter, HttpProvider } = IconService;
const { DeployTransactionBuilder, CallTransactionBuilder } = IconBuilder;

export const readSmartContract = async <Type>(
  inputs: ICallToSmartContractInputs
): Promise<Type> => {
  const { network, walletAddress, contractAddress, method, params } = inputs;
  const provider = new HttpProvider(
    `https://${network}.net.solidwallet.io/api/v3`
  );

  const iconService = new IconService(provider);

  return iconService
    .call({
      from: walletAddress,
      to: contractAddress,
      dataType: "call",
      data: {
        method,
        params,
      },
    })
    .execute();
};

export const deploySmartContract = async (
  inputs: IDeploySmartContractInputs
): Promise<string> => {
  const { network, walletAddress, deploy, params } = inputs;
  const provider = new HttpProvider(
    `https://${network}.net.solidwallet.io/api/v3`
  );
  const debugProvider = new HttpProvider(
    `https://${network}.net.solidwallet.io/api/v3d`
  );
  const iconService = new IconService(provider);
  const iconDebugService = new IconService(debugProvider);

  const networkId = IconConverter.toBigNumber(networkMappingToId[network]);
  const version = IconConverter.toBigNumber(3);
  const timestamp = new Date().getTime() * 1000;

  const deployTransactionBuilder = new DeployTransactionBuilder();
  const transaction = deployTransactionBuilder
    .nid(networkId)
    .from(walletAddress)
    .to("cx0000000000000000000000000000000000000000")
    .timestamp(timestamp)
    .contentType(deploy.contentType)
    .content(deploy.content)
    .params(params)
    .version(version)
    .build();

  const estimatedStep = await iconDebugService
    .estimateStep(transaction)
    .execute();
  transaction.stepLimit = estimatedStep;

  return handleDeployEvent(transaction, iconService);
};

export const writeSmartContract = async <Type>(
  inputs: ICallToSmartContractInputs
): Promise<Type> => {
  const { network, walletAddress, contractAddress, method, params } = inputs;

  const debugProvider = new HttpProvider(
    `https://${network}.net.solidwallet.io/api/v3d`
  );
  const iconDebugService = new IconService(debugProvider);

  const networkId = IconConverter.toBigNumber(networkMappingToId[network]);
  const version = IconConverter.toBigNumber(3);
  const timestamp = new Date().getTime() * 1000;

  const callTransactionBuilder = new CallTransactionBuilder();
  const transaction = callTransactionBuilder
    .nid(networkId)
    .from(walletAddress)
    .to(contractAddress)
    .method(method)
    .timestamp(timestamp)
    .params(params)
    .version(version)
    .build();

  const estimatedStep = await iconDebugService
    .estimateStep(transaction)
    .execute();
  transaction.stepLimit = estimatedStep;

  return handleWriteMethodEvent(transaction);
};

const handleDeployEvent = async (
  transaction: DeployTransaction,
  iconService: IconService
): Promise<string> => {
  const customEvent = new CustomEvent("ICONEX_RELAY_REQUEST", {
    detail: {
      type: "REQUEST_JSON-RPC",
      payload: {
        jsonrpc: "2.0",
        method: "icx_sendTransaction",
        id: 50889,
        params: IconConverter.toRawTransaction(transaction),
      },
    },
  });

  return await new Promise((resolve, reject) => {
    window.dispatchEvent(customEvent);

    const eventHandler: EventListenerOrEventListenerObject = async (
      event: Event
    ) => {
      window.removeEventListener("ICONEX_RELAY_RESPONSE", eventHandler);

      const { type, payload } = (event as CustomEvent).detail;
      if (type === "RESPONSE_JSON-RPC") {
        setTimeout(async () => {
          const transactionResult = await iconService
            .getTransactionResult(payload.result)
            .execute();
          resolve(transactionResult.scoreAddress || "");
        }, 5000);
      } else if (type === "CANCEL_JSON-RPC") {
        console.error("User cancelled JSON-RPC request");
        reject();
      }
    };

    window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler);
  });
};

const handleWriteMethodEvent = async <Type>(
  transaction: CallTransaction
): Promise<Type> => {
  const customEvent = new CustomEvent("ICONEX_RELAY_REQUEST", {
    detail: {
      type: "REQUEST_JSON-RPC",
      payload: {
        jsonrpc: "2.0",
        method: "icx_sendTransaction",
        id: 50889,
        params: IconConverter.toRawTransaction(transaction),
      },
    },
  });

  return await new Promise((resolve, reject) => {
    window.dispatchEvent(customEvent);

    const eventHandler = (event: Event) => {
      window.removeEventListener("ICONEX_RELAY_RESPONSE", eventHandler);

      const { type, payload } = (event as CustomEvent).detail;
      if (type === "RESPONSE_JSON-RPC") {
        resolve(payload.result);
      } else if (type === "CANCEL_JSON-RPC") {
        console.error("User cancelled JSON-RPC request");
        reject();
      }
    };

    window.addEventListener("ICONEX_RELAY_RESPONSE", eventHandler);
  });
};
