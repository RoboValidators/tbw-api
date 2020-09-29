import { NetworkConfig } from "@config";
import { Module, HttpModule, Global } from "@nestjs/common";
import { setupCache } from "axios-cache-adapter";

import { ApiService } from "./api.service";

const cache = setupCache({
  maxAge: 0 // By default requests are not cached
});

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async () => ({
        baseURL: (await NetworkConfig.get()).config.relayUrl,
        adapter: cache.adapter
      })
    })
  ],
  providers: [ApiService],
  exports: [ApiService]
})
export class ApiModule {}
