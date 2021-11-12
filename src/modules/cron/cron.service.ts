import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import VoterService from "@modules/voter/voter.service";
import TbwService from "@modules/tbw/tbw.service";
import TransactionService from "@modules/transaction/transaction.service";

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly voterService: VoterService,
    private readonly tbwService: TbwService,
    private readonly transactionService: TransactionService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_5PM)
  async handleCron() {
    this.logger.log(`Handling scheduled payout`);
    try {
      await this.voterService.processPayouts();
      await this.tbwService.removeOldTbwData();
      await this.transactionService.removeOldTransactions();
    } catch (e) {
      this.logger.log("Seomthing failed..");
      this.logger.debug(e);
    }
  }
}
