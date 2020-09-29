import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import VoterService from "@modules/voter/voter.service";

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly voterService: VoterService) {}

  @Cron(CronExpression.EVERY_DAY_AT_5PM)
  handleCron() {
    this.logger.log(`Handling scheduled payout`);
    this.voterService.processPayouts();
  }
}
