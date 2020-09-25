import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import SimpleService from "@modules/simple/simple.service";

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly simpleService: SimpleService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  handleCron() {
    this.logger.log(`Handling scheduled payout`);
    this.simpleService.processPayouts();
  }
}
