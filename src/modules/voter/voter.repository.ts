import admin from "firebase-admin";
import { CustomRepository, BaseFirestoreRepository } from "fireorm";

import { Injectable } from "@nestjs/common";

import VoterModel, { voterCollectionName } from "./voter.entity";

@Injectable()
@CustomRepository(VoterModel)
class VoterRepository extends BaseFirestoreRepository<VoterModel> {
  constructor() {
    super(voterCollectionName);
  }

  async findAllPaginated(page: number, limit: number): Promise<VoterModel[]> {
    const db = admin.firestore();
    const result = await db
      .collection(this.colName)
      .orderBy("pendingBalance", "desc")
      .offset((page - 1) * limit)
      .limit(limit)
      .get();

    return result.docs.map((doc) => {
      const data = doc.data();
      const voter = new VoterModel();
      voter.id = data.id;
      voter.wallet = data.wallet;
      voter.paidBalance = data.paidBalance;
      voter.pendingBalance = data.pendingBalance;

      return voter;
    });
  }
}

export default VoterRepository;
