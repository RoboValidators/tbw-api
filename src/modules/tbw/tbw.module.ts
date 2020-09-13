import { Module } from "@nestjs/common";

import { ApiModule } from "@services/api/api.module";
import { BlockchainModule } from "@services/blockchain/blockchain.module";

import TbwController from "./tbw.controller";
import TbwRepository from "./tbw.repository";
import TbwService from "./tbw.service";

@Module({
  controllers: [TbwController],
  providers: [TbwService, TbwRepository], // Import injectables directly
  imports: [ApiModule, BlockchainModule] // Import outside modules (required because ApiModule has imports)
})
export default class TbwModule {}
