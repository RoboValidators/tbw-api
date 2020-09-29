import { Module } from "@nestjs/common";

import VoterModule from "@modules/voter/voter.module";

import { CronService } from "./cron.service";

@Module({
  providers: [CronService],
  imports: [VoterModule]
})
export default class CronModule {}
