import { Controller, Get, Query, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@guards/auth.guard";

import TbwService from "./tbw.service";
import TrueBlockWeight from "./tbw.entity";
import TrueBlockWeightDTO from "./dto/TrueBlockWeightDTO";

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
