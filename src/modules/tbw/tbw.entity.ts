import { Collection } from "fireorm";

import { Rewards, Voter } from "@types";

export const tbwCollectionName = "trueBlockWeight";

export class TrueBlockWeightDTO {
  id: string;
  fromBlock: number;
  toBlock: number;
  rewards: Rewards;

  /**
   * Payout statistics per block
   */
  blockReward: string; // Total rewards available for distribution
  votersReward: string; // Total amount being paid to voters
  licenseFee: string; // Fee for usage of the license
  validatorFee: string; // Fee for the validator
}

@Collection(tbwCollectionName)
export default class TrueBlockWeight {
  id: string;
  block: number;
  voters: Voter[];

  /**
   * Payout statistics per block
   */
  blockReward: string; // Total rewards available for distribution
  votersReward: string; // Total amount being paid to voters
  licenseFee: string; // Fee for usage of the license
  validatorFee: string; // Fee for the validator

  /**
   * Voter & blacklist statistics per block
   */
  totalPower: string; // Total voting power of the validator
  blacklistedPower: string; // Total blacklisted voting power of the validator
  numberOfVoters: number; // Amount of voters
  numberOfBlacklistedVoters: number; // Amount of voters blacklisted
}
