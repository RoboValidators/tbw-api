import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";

import HealthController from "@modules/health/health.controller";

import TbwModule from "./tbw/tbw.module";
import VoterModule from "./voter/voter.module";
import CronModule from "./cron/cron.module";
import TransactionModule from "./transaction/transaction.module";

@Module({
  imports: [
    // Health check section
    TerminusModule,
    // Env Variables section
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // Enable Cron Jobs
    ScheduleModule.forRoot(),
    // Application modules
    TbwModule, // /advanced endpoint
    VoterModule, // /simple endpoint
    TransactionModule, // /transactions endpoint
    CronModule
  ],
  controllers: [HealthController]
})
export class AppModule {}
