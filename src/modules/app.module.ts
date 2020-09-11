import { HttpModule, Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { setupCache } from "axios-cache-adapter";

import TbwModule from "./tbw/tbw.module";
import HealthController from "./health/health.controller";

const cache = setupCache({
  maxAge: 0 // By default requests are not cached
});

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>("NETWORK_API"),
        adapter: cache.adapter
      }),
      inject: [ConfigService]
    }),
    // Health check section
    TerminusModule,
    // Env Variables section
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // Project modules section
    TbwModule
  ],
  controllers: [HealthController],
  providers: []
})
export class AppModule {}
