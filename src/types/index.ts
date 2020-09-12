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
