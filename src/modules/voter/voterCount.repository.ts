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
}

export default VoterCountRepository;
