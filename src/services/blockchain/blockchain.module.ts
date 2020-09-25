import { Module, Global } from "@nestjs/common";

import TransactionModule from "@modules/transaction/transaction.module";
import { ApiModule } from "@services/api/api.module";
import { VoterModule } from "@services/voter/voter.module";

import { BlockchainService } from "./blockchain.service";

@Global()
@Module({
  imports: [ApiModule, VoterModule, TransactionModule],
  providers: [BlockchainService],
  exports: [BlockchainService]
})
export class BlockchainModule {}
