import { CustomRepository, BaseFirestoreRepository } from "fireorm";

import { Injectable } from "@nestjs/common";

import TrueBlockWeightModel, { tbwCollectionName } from "./tbw.entity";

@Injectable()
@CustomRepository(TrueBlockWeightModel)
class TbwRepository extends BaseFirestoreRepository<TrueBlockWeightModel> {
  constructor() {
    super(tbwCollectionName);
  }

  async findBetweenBlocks(from: number, to: number): Promise<TrueBlockWeightModel[]> {
    return this.whereGreaterOrEqualThan("block", from).whereLessOrEqualThan("block", to).find();
  }

  async removeOlTbwData(block: number): Promise<TrueBlockWeightModel[]> {
    const result = await this.whereLessOrEqualThan("block", block).find();

    const batch = this.createBatch();
    const oldTbwValues = [];

    for (const oldTbwValue of result) {
      oldTbwValues.push(oldTbwValue);
      batch.delete(oldTbwValue);
    }

    await batch.commit();
    return oldTbwValues;
  }
}

export default TbwRepository;
