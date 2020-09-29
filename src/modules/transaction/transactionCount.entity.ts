import { Collection } from "fireorm";

export const transactionCountCollectionName = "transactions-count";

@Collection(transactionCountCollectionName)
export default class TransactionCount {
  id: string;
  length: number;
}
