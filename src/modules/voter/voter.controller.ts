import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@guards/auth.guard";
import { VoterDTO } from "@modules/voter/voter.entity";
import { TransactionDTO } from "@modules/transaction/transaction.entity";
import { Api } from "@types";

import VoterService from "./voter.service";

@Controller("simple")
export default class VoterController {
  constructor(private readonly voterService: VoterService) {}

  @Get()
  async get(
    @Req() request,
    @Query("page") page = "1",
    @Query("limit") limit = "20"
  ): Promise<Api.VoterResponseDTO> {
    const parsedPage = parseInt(page) <= 0 ? 1 : parseInt(page);
    const parsedLimit = parseInt(limit) > 100 ? 100 : parseInt(limit);

    return this.voterService.findAllPaginated(parsedPage, parsedLimit, request.route.path);
  }

  @Get("dry")
  @UseGuards(AuthGuard)
  async processDry(): Promise<VoterDTO[]> {
    return this.voterService.calculatePayouts();
  }

  @Get("process")
  @UseGuards(AuthGuard)
  async process(): Promise<TransactionDTO[]> {
    return this.voterService.processPayouts();
  }
}
