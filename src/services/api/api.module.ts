import { Module, HttpModule, Global } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { setupCache } from "axios-cache-adapter";

import { ApiService } from "./api.service";

const cache = setupCache({
  maxAge: 0 // By default requests are not cached
});

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>("NETWORK_API"),
        adapter: cache.adapter
      }),
      inject: [ConfigService]
    })
  ],
  providers: [ApiService]
})
export class ApiModule {}
