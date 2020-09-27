import { Collection } from "fireorm";

export const voterCountCollectionName = "voters-count";

@Collection(voterCountCollectionName)
export default class VoterCount {
  id: string;
  length: number;
}
