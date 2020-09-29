import { Interfaces } from "@arkecosystem/crypto";

export * as Api from "./api";
export * as Blockchain from "./blockchain";

export interface Voter {
  wallet: string;
  share: string;
  reward: string;
  power: string;
}

export interface Rewards {
  [key: string]: string;
}

export interface INetworkConfig extends Interfaces.INetworkConfig {
  config: {
    name: string;
    token: string;
    relayUrl: string;
    explorerUrl: string;
    network: string;
  };
}
