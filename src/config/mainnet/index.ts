import exceptions from "./exceptions.json";
import genesisBlock from "./genesisBlock.json";
import milestones from "./milestones.json";
import network from "./network.json";

export const config = {
  name: "Compendia",
  token: "BIND",
  relayUrl: "https://api.compendia.org/api/v2",
  explorerUrl: "https://bindscan.io",
  network: "mainnet"
};

export { exceptions, genesisBlock, milestones, network };
