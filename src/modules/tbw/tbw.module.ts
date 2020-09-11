import { Module } from "@nestjs/common";

import TbwController from "./tbw.controller";
import TbwRepository from "./tbw.repository";
import TbwService from "./tbw.service";
import { ApiModule } from "../../services/api/api.module";
import { ApiService } from "../..//services/api/api.service";

@Module({
  controllers: [TbwController],
  providers: [TbwService, TbwRepository]
})
export default class TbwModule {}
