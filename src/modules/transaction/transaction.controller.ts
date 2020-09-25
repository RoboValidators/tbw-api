import { Controller, Get, Query, Req } from "@nestjs/common";

import { TransactionsDTO } from "@modules/transaction/transaction.entity";

import TransactionService from "./transaction.service";

@Controller("transactions")
export default class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async get(
    @Req() request,
    @Query("page") page = "1",
    @Query("limit") limit = "25"
  ): Promise<TransactionsDTO> {
    const parsedPage = parseInt(page) <= 0 ? 1 : parseInt(page);
    const parsedLimit = parseInt(limit) > 100 ? 100 : parseInt(limit);

    return this.transactionService.findAll(parsedPage, parsedLimit, request.route.path);
  }
}
