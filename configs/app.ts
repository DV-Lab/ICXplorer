const appSlogan =
  "The best place for web3 developers to explore smart contracts from world-class web3 protocols & engineers — all deployable with one click.";

const appUrl = "https://icxplorer.vercel.app";

const numberTypes = ["BigInteger", "int"];

const networkMappingToId: { [key: string]: number } = {
  mainnet: 0x1,
  lisbon: 0x2,
  berlin: 0x7,
  sejong: 0x53,
};

export { appSlogan, appUrl, networkMappingToId, numberTypes };
