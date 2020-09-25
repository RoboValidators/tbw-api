import { Module, Global } from "@nestjs/common";

import TransactionModule from "@modules/transaction/transaction.module";
import { ApiModule } from "@services/api/api.module";
import VoterRepository from "@modules/voter/voter.repository";

import { BlockchainService } from "./blockchain.service";

@Global()
@Module({
  imports: [ApiModule, TransactionModule],
  providers: [BlockchainService, VoterRepository],
  exports: [BlockchainService]
})
export class BlockchainModule {}
