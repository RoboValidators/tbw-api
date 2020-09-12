import * as exceptions from "./exceptions.json";
import * as genesisBlock from "./genesisBlock.json";
import * as milestones from "./milestones.json";
import * as network from "./network.json";

export const config = {
  name: "Compendia",
  token: "BIND",
  relayUrl: "https://api.compendia.org/api/v2",
  explorerUrl: "https://bindscan.io",
  network: "mainnet"
};

export { exceptions, genesisBlock, milestones, network };
