import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IThemeState {
  darkMode: TDarkModeStatus;
  setDarkMode: (mode: TDarkModeStatus) => void;
}

const useThemeStore = create<IThemeState>((set) => ({
  darkMode: "light",
  setDarkMode: (mode) => {
    set({ darkMode: mode });
  },
}));

interface IAppState {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  deployedAddress: IDeployedAddress;
  setDeployedAddress: (
    deployAddress: IDeployedAddress,
    name: string,
    address: string
  ) => void;
}

const useAppStore = create<IAppState>()(
  devtools(
    persist(
      (set) => ({
        walletAddress: "",
        setWalletAddress: (address) => {
          set({ walletAddress: address });
        },
        deployedAddress: {},
        setDeployedAddress: (
          deployAddress: IDeployedAddress,
          name: string,
          address: string
        ) => {
          const newDeployAddress = deployAddress;
          newDeployAddress[name] = address;
          set(newDeployAddress);
        },
      }),
      {
        name: "IXplorerStorage",
      }
    )
  )
);

export { useAppStore, useThemeStore };
