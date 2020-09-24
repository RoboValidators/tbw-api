import { Module, Global } from "@nestjs/common";

import { ApiModule } from "@services/api/api.module";
import { TransactionModule } from "@services/transaction/transaction.module";
import { VoterModule } from "@services/voter/voter.module";

import { BlockchainService } from "./blockchain.service";

@Global()
@Module({
  imports: [ApiModule, VoterModule, TransactionModule],
  providers: [BlockchainService],
  exports: [BlockchainService]
})
export class BlockchainModule {}
