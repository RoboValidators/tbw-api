import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { ConfigModule } from "@nestjs/config";

import HealthController from "./health/health.controller";
import TbwModule from "./tbw/tbw.module";

@Module({
  imports: [
    // Health check section
    TerminusModule,
    // Env Variables section
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // Application modules
    TbwModule
  ],
  controllers: [HealthController]
})
export class AppModule {}
