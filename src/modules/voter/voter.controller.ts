import { Controller, Get, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@guards/auth.guard";
import { VoterDTO } from "@modules/voter/voter.entity";
import Transaction from "@modules/transaction/transaction.entity";

import VoterService from "./voter.service";

@Controller("simple")
export default class VoterController {
  constructor(private readonly voterService: VoterService) {}

  @Get()
  async get(): Promise<VoterDTO[]> {
    return this.voterService.calculatePayouts();
  }

  // TODO return TransactionDTO??
  @Get("process")
  @UseGuards(AuthGuard)
  async process(): Promise<Transaction[]> {
    return this.voterService.processPayouts();
  }
}
