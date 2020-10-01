import admin from "firebase-admin";
import { Injectable } from "@nestjs/common";
import { CustomRepository, BaseFirestoreRepository } from "fireorm";

import TransactionModel, { transactionCollectionName } from "./transaction.entity";

@Injectable()
@CustomRepository(TransactionModel)
class TransactionRepository extends BaseFirestoreRepository<TransactionModel> {
  constructor() {
    super(transactionCollectionName);
  }

  async findAllPaginated(page: number, limit: number): Promise<TransactionModel[]> {
    const db = admin.firestore();
    const result = await db
      .collection(this.colName)
      .orderBy("date", "desc")
      .offset((page - 1) * limit)
      .limit(limit)
      .get();

    return result.docs.map((doc) => {
      const data = doc.data();
      const transaction = new TransactionModel();
      transaction.id = data.id;
      transaction.amount = data.amount;
      transaction.txId = data.txId;
      transaction.wallet = data.wallet;
      transaction.date = data.date;

      return transaction;
    });
  }

  async addTransactions(
    txs: { amount: string; wallet: string }[],
    txId: string
  ): Promise<TransactionModel[]> {
    const batch = this.createBatch();
    const txModels = [];

    for (const tx of txs) {
      const txModel = new TransactionModel();
      txModel.amount = tx.amount;
      txModel.wallet = tx.wallet;
      txModel.txId = txId;
      txModel.date = Date.now();

      txModels.push(txModel);

      batch.create(txModel);
    }

    await batch.commit();
    return txModels;
  }
}

export default TransactionRepository;
