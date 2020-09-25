import { Module } from "@nestjs/common";
import { BlockchainModule } from "@services/blockchain/blockchain.module";

import VoterController from "./voter.controller";
import VoterRepository from "./voter.repository";
import VoterService from "./voter.service";

@Module({
  controllers: [VoterController],
  imports: [BlockchainModule],
  providers: [VoterService, VoterRepository],
  exports: [VoterService, VoterRepository]
})
export default class VoterModule {}
