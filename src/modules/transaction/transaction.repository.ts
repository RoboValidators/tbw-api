import { CustomRepository, BaseFirestoreRepository } from "fireorm";

import { Injectable } from "@nestjs/common";

import TransactionModel, { transactionCollectionName } from "./transaction.entity";

@Injectable()
@CustomRepository(TransactionModel)
class TransactionRepository extends BaseFirestoreRepository<TransactionModel> {
  constructor() {
    super(transactionCollectionName);
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
    return txModels;
  }
}

export default TransactionRepository;
