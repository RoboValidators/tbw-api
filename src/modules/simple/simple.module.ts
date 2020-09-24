import { Module } from "@nestjs/common";

import { ApiModule } from "@services/api/api.module";
import { BlockchainModule } from "@services/blockchain/blockchain.module";
import VoterRepository from "@services/voter/voter.repository";

import SimpleController from "./simple.controller";
import SimpleService from "./simple.service";

@Module({
  controllers: [SimpleController],
  providers: [SimpleService, VoterRepository], // Import injectables directly
  imports: [ApiModule, BlockchainModule], // Import outside modules (required because ApiModule has imports)
  exports: [SimpleService]
})
export default class SimpleModule {}
