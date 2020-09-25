import { Collection } from "fireorm";

export const transactionCollectionName = "transactions";

export interface TransactionDTO {
  id: string;
  wallet: string;
  amount: string;
  txId: string;
}

export interface TransactionsDTO {
  meta: {
    count: number;
    pageCount: number;
    totalCount: number;
    next: string | null;
    previous: string | null;
    self: string;
    first: string;
    last: string;
  };
  data: {
    transactions: TransactionDTO[];
    count: number;
  };
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
