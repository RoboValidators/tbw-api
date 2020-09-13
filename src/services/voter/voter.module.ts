import { Module, Global } from "@nestjs/common";

import VoterRepository from "./voter.repository";

@Global()
@Module({
  providers: [VoterRepository],
  exports: [VoterRepository]
})
export class VoterModule {}
