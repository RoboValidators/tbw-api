/* eslint-disable  */
import { Controller, Get, Query } from "@nestjs/common";

// import { ApiService } from "../../services/api/api.service";

import { Rewards } from "@types";

import TbwService from "./tbw.service";
import TrueBlockWeight from "./tbw.entity";
import { ApiService } from "@services/api/api.service";

@Controller("tbw")
export default class TbwController {
  constructor(private readonly a: ApiService, private readonly tbwService: TbwService) {}

  
  
  @Get()
  findBetweenBlocks(from: number, to: number): Promise<TrueBlockWeight[]> {
    const f = 0;
    const t = 300000;

    return this.tbwService.findBetweenBlocks(f, t);
  }

  @Get("dry")
  async dryRun(@Query("from") f?: string, @Query("to") t?: string): Promise<Rewards> {
    const from = f ? parseInt(f) : 0;
    const to = t ? parseInt(t) : Number.MAX_SAFE_INTEGER;

    return this.tbwService.calculatePayouts(from, to);
  }
}
