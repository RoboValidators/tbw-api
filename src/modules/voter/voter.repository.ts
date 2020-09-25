import { CustomRepository, BaseFirestoreRepository } from "fireorm";

import { Injectable } from "@nestjs/common";

import VoterModel, { votersCollectionName } from "./voter.entity";

@Injectable()
@CustomRepository(VoterModel)
class VoterRepository extends BaseFirestoreRepository<VoterModel> {
  constructor() {
    super(votersCollectionName);
  }
}

export default VoterRepository;
