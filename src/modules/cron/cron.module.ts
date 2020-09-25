import { Module } from "@nestjs/common";

import VoterModule from "@modules/voter/voter.module";

import { CronService } from "./cron.service";

@Module({
  providers: [CronService], // Import injectables directly
  imports: [VoterModule] // Import outside modules (required because ApiModule has imports)
})
export default class CronModule {}
