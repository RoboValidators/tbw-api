import exceptions from "./exceptions.json";
import genesisBlock from "./genesisBlock.json";
import milestones from "./milestones.json";
import network from "./network.json";

export const config = {
  name: "Compendia",
  token: "BIND",
  relayUrl: "https://api.nos.dev/api/v2",
  explorerUrl: "https://explorer.nos.dev",
  network: "devnet"
};

export { exceptions, genesisBlock, milestones, network };
