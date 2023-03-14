import { ComponentLoading } from "@components/ComponentLoading";
import { DirectoryComponent } from "@components/DirectoryComponent";
import { appSlogan } from "@configs/app";
import { PROJECT_NAME as projectName } from "@env";
import { useCallback, useEffect, useState } from "react";

export const AppScreen: IComponent = () => {
  const [smartContracts, setSmartContracts] = useState<IContract[] | null>(
    null
  );
  const fetchSmartContracts = useCallback(() => {
    fetch(`/api/contracts`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        setSmartContracts(data);
      });
  }, []);
  useEffect(() => {
    fetchSmartContracts();
  }, [fetchSmartContracts]);
  return (
    <div className="min-h-screen text-lightText dark:text-darkText mx-40 px-2 py-10 font-serif">
      <div className="heading flex flex-col gap-6">
        <h1 className="text-7xl font-semibold dark:text-white">
          {projectName}
        </h1>
        <p className="text-2xl ">{appSlogan}</p>
      </div>
      <main className="py-10">
        {smartContracts !== null ? (
          <DirectoryComponent
            name="Popular"
            title="A collection of our most deployed contracts."
            smartContracts={smartContracts}
          />
        ) : (
          <div className="min-h-[40vh] flex justify-center items-center">
            <ComponentLoading />
          </div>
        )}
      </main>
    </div>
  );
};
