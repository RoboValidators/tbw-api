import { Controller, Get, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@guards/auth.guard";
import { VoterDTO } from "@services/voter/voter.entity";
import Transaction from "@services/transaction/transaction.entity";

import SimpleService from "./simple.service";

@Controller("simple")
export default class SimpleController {
  constructor(private readonly simpleService: SimpleService) {}

  @Get()
  async get(): Promise<VoterDTO[]> {
    return this.simpleService.calculatePayouts();
  }

  // TODO return TransactionDTO??
  @Get("process")
  @UseGuards(AuthGuard)
  async process(): Promise<Transaction[]> {
    return this.simpleService.processPayouts();
  }
}
