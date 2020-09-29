import { Rewards } from "@types";

export default class TrueBlockWeightDTO {
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
