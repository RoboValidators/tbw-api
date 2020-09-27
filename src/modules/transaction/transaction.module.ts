import { Module } from "@nestjs/common";

import TransactionController from "./transaction.controller";
import TransactionRepository from "./transaction.repository";
import TransactionService from "./transaction.service";
import TransactionCountRepository from "./transactionCount.repository";

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository, TransactionCountRepository],
  exports: [TransactionRepository]
})
export default class TransactionModule {}
