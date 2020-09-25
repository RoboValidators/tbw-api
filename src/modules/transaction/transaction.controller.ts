import { Controller, Get } from "@nestjs/common";

import { TransactionDTO } from "@modules/transaction/transaction.entity";

import TransactionService from "./transaction.service";

@Controller("transactions")
export default class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async get(): Promise<TransactionDTO[]> {
    return this.transactionService.findAll();
  }
}
