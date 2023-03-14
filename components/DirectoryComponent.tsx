import { ComponentLoading } from "./ComponentLoading";
import { SmartContractComponent } from "./SmartContractComponent";

export const DirectoryComponent: IComponent<{
  name: string;
  title: string;
  smartContracts: IContract[];
}> = ({ name, title, smartContracts }) => {
  return (
    <div className="mt-10">
      <h1 className="text-3xl font-semibold dark:text-white">{name}</h1>
      <h2 className="mt-2 text-base">{title}</h2>
      {smartContracts?.length > 0 ? (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {smartContracts.map((sm, index) => (
            <SmartContractComponent key={index} {...sm} />
          ))}
        </div>
      ) : (
        <ComponentLoading />
      )}
    </div>
  );
};
