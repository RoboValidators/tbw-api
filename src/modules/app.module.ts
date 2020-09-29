import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { ConfigModule } from "@nestjs/config";

import TbwModule from "@modules/tbw/tbw.module";
import HealthController from "@modules/health/health.controller";

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
