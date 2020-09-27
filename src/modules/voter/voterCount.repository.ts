import BigNumber from "bignumber.js";
import { CustomRepository, BaseFirestoreRepository } from "fireorm";
import { Injectable } from "@nestjs/common";

import VoterCountModel, { voterCountCollectionName } from "./voterCount.entity";

@Injectable()
@CustomRepository(VoterCountModel)
class VoterCountRepository extends BaseFirestoreRepository<VoterCountModel> {
  public id: string;

  constructor() {
    super(voterCountCollectionName);
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

export default VoterCountRepository;
