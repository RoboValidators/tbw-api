import { Module } from "@nestjs/common";

import TbwController from "./tbw.controller";
import TbwRepository from "./tbw.repository";
import TbwService from "./tbw.service";

@Module({
  controllers: [TbwController],
  providers: [TbwService, TbwRepository]
})
export default class TbwModule {}
