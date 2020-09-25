import { Module } from "@nestjs/common";

import { ApiModule } from "@services/api/api.module";
import { BlockchainModule } from "@services/blockchain/blockchain.module";

import VoterController from "./voter.controller";
import VoterRepository from "./voter.repository";
import VoterService from "./voter.service";

@Module({
  controllers: [VoterController],
  imports: [ApiModule, BlockchainModule],
  providers: [VoterService, VoterRepository],
  exports: [VoterService, VoterRepository]
})
export default class VoterModule {}
