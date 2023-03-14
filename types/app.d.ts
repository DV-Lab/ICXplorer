type TDarkModeStatus = "dark" | "light" | "auto";
type ObjectId = import("mongoose").Types.ObjectId;

interface IResource {
  name: string;
  link: string;
}
interface IWriteMethod {
  name: string;
  description?: string;
  inputs: IInput[];
  returnType: string;
  payable: boolean;
}

interface IReadMethod {
  name: string;
  description?: string;
  inputs: IInput[];
  returnType: string;
  pure: boolean;
}

interface IFunctions {
  writeMethods: IWriteMethod[];
  readMethods: IReadMethod[];
}

interface IInput {
  name: string;
  type: string;
}

interface IEvent {
  name: string;
  description?: string;
  inputs: IInput[];
}

interface ISource {
  name: string;
  code: string;
}

interface ISchemaContract {
  name: string;
  summary: string;
  version: string;
  description?: string;
  icon?: string;
  useCases?: string[];
  resources?: IResource[];
  functions?: IFunctions;
  events?: IEvent[];
  sources?: ISource[];
}

interface IContract extends ISchemaContract {
  id: string | ObjectId;
}

interface IConstructorInput extends IInput {
  description: string;
}
interface ISchemaDeploy {
  contractId: Types.ObjectId | string;
  content: string;
  contentType: string;
  constructors: IConstructorInput[];
}

interface IDeploy extends ISchemaDeploy {
  id: string | ObjectId;
}

interface IParams {
  [key: string]: string | number;
}

interface IDeploySmartContractInputs {
  network: string;
  walletAddress: string;
  params: IParams;
  deploy: IDeploy;
}

interface ICallToSmartContractInputs {
  network: string;
  walletAddress: string;
  method: string;
  params: IParams;
  contractAddress: string;
}

interface IDeployedAddress {
  [key: string]: string;
}
