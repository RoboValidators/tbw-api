import { Controller, Get, Query } from "@nestjs/common";

import { Rewards } from "@types";

import TbwService from "./tbw.service";
import TrueBlockWeight from "./tbw.entity";

@Controller("tbw")
export default class TbwController {
  constructor(private readonly tbwService: TbwService) {}

  @Get()
  findBetweenBlocks(
    @Query("from") f?: string,
    @Query("to") t?: string
  ): Promise<TrueBlockWeight[]> {
    const from = f ? parseInt(f) : 0;
    const to = t ? parseInt(t) : Number.MAX_SAFE_INTEGER;

    return this.tbwService.findBetweenBlocks(from, to);
  }

  @Get("dry")
  async dryRun(@Query("from") f?: string, @Query("to") t?: string): Promise<Rewards> {
    const from = f ? parseInt(f) : 0;
    const to = t ? parseInt(t) : Number.MAX_SAFE_INTEGER;

    return this.tbwService.calculatePayouts(from, to);
  }
}
