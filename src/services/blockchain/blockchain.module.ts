import { Module, Global } from "@nestjs/common";

import { ApiModule } from "@services/api/api.module";

import { BlockchainService } from "./blockchain.service";

@Global()
@Module({
  imports: [ApiModule],
  providers: [BlockchainService],
  exports: [BlockchainService]
})
export class BlockchainModule {}
