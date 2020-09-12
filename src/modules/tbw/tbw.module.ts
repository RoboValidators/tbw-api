import { Module } from "@nestjs/common";

import TbwController from "./tbw.controller";
import TbwRepository from "./tbw.repository";
import TbwService from "./tbw.service";
import { ApiModule } from "../../services/api/api.module";

@Module({
  controllers: [TbwController],
  providers: [TbwService, TbwRepository], // Import injectables directly
  imports: [ApiModule] // Import outside modules (required because ApiModule has imports)
})
export default class TbwModule {}
