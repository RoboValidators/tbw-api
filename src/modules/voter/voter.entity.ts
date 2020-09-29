import { Collection } from "fireorm";

export const voterCollectionName = "voters";

export interface VoterDTO {
  id: string;
  wallet: string;
  paidBalance: string;
  pendingBalance: string;
}

@Collection(voterCollectionName)
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
