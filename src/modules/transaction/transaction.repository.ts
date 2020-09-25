import { CustomRepository, BaseFirestoreRepository } from "fireorm";
import admin from "firebase-admin";

import { Injectable } from "@nestjs/common";

import { BigNumber } from "@arkecosystem/crypto/dist/utils";

import TransactionModel, { transactionCollectionName } from "./transaction.entity";

@Injectable()
@CustomRepository(TransactionModel)
class TransactionRepository extends BaseFirestoreRepository<TransactionModel> {
  constructor() {
    super(transactionCollectionName);
  }

  async getPaginated(
    page: number,
    limit: number
  ): Promise<{ transactions: TransactionModel[]; count: number }> {
    const db = admin.firestore();
    const result = await db
      .collection(this.colName)
      .orderBy("amount")
      .offset((page - 1) * limit)
      .limit(limit)
      .get();

    const count = (await db.collection(`${this.colName}-count`).get()).docs[0].data().length;

    const transactions = result.docs.map((doc) => {
      const data = doc.data();
      const transaction = new TransactionModel();
      transaction.id = data.id;
      transaction.amount = data.amount;
      transaction.txId = data.txId;
      transaction.wallet = data.wallet;

      return transaction;
    });

    return {
      transactions,
      count
    };
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
      txModels.push(txModel);

      batch.create(txModel);
    }

    await batch.commit();

    const db = admin.firestore();
    const ref = db.collection(`${this.colName}-count`).doc("count");
    const get = await ref.get();
    if (get.exists) {
      await ref.update({
        length: new BigNumber(get.data().length as any).plus(txs.length).toString()
      });
    } else {
      await ref.create({ length: txs.length.toString() });
    }

    return txModels;
  }
}

export default TransactionRepository;
