import { Module, Global } from "@nestjs/common";

import VoterRepository from "./transaction.repository";

@Global()
@Module({
  providers: [VoterRepository],
  exports: [VoterRepository]
})
export class VoterModule {}
