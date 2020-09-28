import { Collection } from "fireorm";

export const transactionCollectionName = "transactions";

export interface TransactionDTO {
  id: string;
  wallet: string;
  amount: string;
  txId: string;
  date: number;
}

@Collection(transactionCollectionName)
export default class Transaction {
  id: string;
  wallet: string;
  amount: string;
  txId: string;
  date: number;
}

export const toTransactionDto = (tx: Transaction): TransactionDTO => {
  return {
    id: tx.id,
    wallet: tx.wallet,
    amount: tx.amount,
    txId: tx.txId,
    date: tx.date
  };
};
