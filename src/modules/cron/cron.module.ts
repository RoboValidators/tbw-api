import { Module } from "@nestjs/common";

import SimpleModule from "@modules/simple/simple.module";

import { CronService } from "./cron.service";

@Module({
  providers: [CronService], // Import injectables directly
  imports: [SimpleModule] // Import outside modules (required because ApiModule has imports)
})
export default class CronModule {}
