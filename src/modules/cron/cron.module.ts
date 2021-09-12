import { Module } from "@nestjs/common";

import VoterModule from "@modules/voter/voter.module";

import TbwService from "@modules/tbw/tbw.service";
import TbwRepository from "@modules/tbw/tbw.repository";
import TransactionService from "@modules/transaction/transaction.service";
import TransactionRepository from "@modules/transaction/transaction.repository";
import TransactionCountRepository from "@modules/transaction/transactionCount.repository";

import { CronService } from "./cron.service";

@Module({
  providers: [
    CronService,
    TbwService,
    TbwRepository,
    TransactionService,
    TransactionRepository,
    TransactionCountRepository
  ],
  imports: [VoterModule]
})
export default class CronModule {}
