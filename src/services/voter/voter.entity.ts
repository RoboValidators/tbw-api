import { Collection } from "fireorm";

export const votersCollectionName = "voters";

export interface VoterDTO {
  id: string;
  wallet: string;
  paidBalance: string;
  pendingBalance: string;
}

@Collection(votersCollectionName)
export default class Voter {
  id: string;
  wallet: string;
  paidBalance: string;
  pendingBalance: string;
}

export const toVoterDto = (voter: Voter): VoterDTO => {
  return {
    id: voter.id,
    wallet: voter.wallet,
    paidBalance: voter.paidBalance,
    pendingBalance: voter.pendingBalance
  };
};
