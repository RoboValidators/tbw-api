import { Collection } from "fireorm";

@Collection("transactions")
export default class Transaction {
  id: string;
  wallet: string;
  paidBalance: string;
  pendingBalance: string;
}
