import { Collection } from "fireorm";

export const transactionCollectionName = "transactions";

@Collection(transactionCollectionName)
export default class Transaction {
  id: string;
  wallet: string;
  amount: string;
  txId: string;
}
