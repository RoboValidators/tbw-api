import { CustomRepository, BaseFirestoreRepository } from "fireorm";

import { Injectable } from "@nestjs/common";

import TrueBlockWeightModel from "./tbw.entity";

@Injectable()
@CustomRepository(TrueBlockWeightModel)
class TbwRepository extends BaseFirestoreRepository<TrueBlockWeightModel> {
  constructor() {
    super("trueBlockWeight");
  }

  async findBetweenBlocks(from: number, to: number): Promise<TrueBlockWeightModel[]> {
    return this.whereGreaterOrEqualThan("block", from).whereLessOrEqualThan("block", to).find();
  }
}

export default TbwRepository;
