import { CustomRepository, BaseFirestoreRepository } from "fireorm";

import { Injectable } from "@nestjs/common";

import VoterModel from "./transaction.entity";

@Injectable()
@CustomRepository(VoterModel)
class VoterRepository extends BaseFirestoreRepository<VoterModel> {
  constructor() {
    super("voters");
  }
}

export default VoterRepository;
