import { Module } from "@nestjs/common";
import { BlockchainModule } from "@services/blockchain/blockchain.module";

import VoterController from "./voter.controller";
import VoterRepository from "./voter.repository";
import VoterService from "./voter.service";
import VoterCountRepository from "./voterCount.repository";

@Module({
  controllers: [VoterController],
  imports: [BlockchainModule],
  providers: [VoterService, VoterRepository, VoterCountRepository],
  exports: [VoterService, VoterRepository]
})
export default class VoterModule {}
