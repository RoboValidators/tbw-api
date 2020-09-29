import { CustomRepository, BaseFirestoreRepository } from "fireorm";
import { Injectable } from "@nestjs/common";
import BigNumber from "bignumber.js";

import TransactionCountModel, { transactionCountCollectionName } from "./transactionCount.entity";

@Injectable()
@CustomRepository(TransactionCountModel)
class TransactionCountRepository extends BaseFirestoreRepository<TransactionCountModel> {
  public id: string;

  constructor() {
    super(transactionCountCollectionName);
    this.id = "count";
  }

  async upsert(amount: number): Promise<number> {
    const count = await this.findById(this.id);
    if (count) {
      const length = new BigNumber(count.length).plus(amount).toNumber();
      await this.update({
        id: this.id,
        length
      });

      return length;
    } else {
      const length = amount;
      await this.create({
        id: this.id,
        length
      });

      return length;
    }
  }
}

export default TransactionCountRepository;
