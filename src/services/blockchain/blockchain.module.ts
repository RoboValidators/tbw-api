import { Module, Global } from "@nestjs/common";

import { ApiModule } from "../api/api.module";

@Global()
@Module({
  imports: [ApiModule]
})
export class BlockchainModule {}
