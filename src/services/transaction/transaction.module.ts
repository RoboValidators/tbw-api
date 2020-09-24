import { Module, Global } from "@nestjs/common";

import TransactionRepository from "./transaction.repository";

@Global()
@Module({
  providers: [TransactionRepository],
  exports: [TransactionRepository]
})
export class TransactionModule {}
