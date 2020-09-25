import { Collection } from "fireorm";

export const transactionCollectionName = "transactions";

export interface TransactionDTO {
  id: string;
  wallet: string;
  amount: string;
  txId: string;
}

@Collection(transactionCollectionName)
export default class Transaction {
  id: string;
  wallet: string;
  amount: string;
  txId: string;
}

export const toTransactionDto = (tx: Transaction): TransactionDTO => {
  return {
    id: tx.id,
    wallet: tx.wallet,
    amount: tx.amount,
    txId: tx.txId
  };
};
