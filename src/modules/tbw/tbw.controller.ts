import { Controller, Get, Query, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@guards/auth.guard";

import TbwService from "./tbw.service";
import { TrueBlockWeightDTO } from "./tbw.entity";

@Controller("advanced")
export default class TbwController {
  constructor(private readonly tbwService: TbwService) {}

  @Get()
  async dryRun(@Query("from") f?: string, @Query("to") t?: string): Promise<TrueBlockWeightDTO> {
    const from = f ? parseInt(f) : 0;
    const to = t ? parseInt(t) : Number.MAX_SAFE_INTEGER;

    return this.tbwService.calculatePayouts(from, to);
  }

  @Get("process")
  @UseGuards(AuthGuard)
  async process(@Query("from") f?: string, @Query("to") t?: string): Promise<TrueBlockWeightDTO> {
    const from = f ? parseInt(f) : 0;
    const to = t ? parseInt(t) : Number.MAX_SAFE_INTEGER;

    return this.tbwService.processPayouts(from, to);
  }
}
