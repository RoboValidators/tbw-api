import { Controller, Get, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@guards/auth.guard";
import { VoterDTO } from "@modules/voter/voter.entity";
import { TransactionDTO } from "@modules/transaction/transaction.entity";

import VoterService from "./voter.service";

@Controller("simple")
export default class VoterController {
  constructor(private readonly voterService: VoterService) {}

  @Get()
  async get(): Promise<VoterDTO[]> {
    return this.voterService.calculatePayouts();
  }

  @Get("process")
  @UseGuards(AuthGuard)
  async process(): Promise<TransactionDTO[]> {
    return this.voterService.processPayouts();
  }
}
