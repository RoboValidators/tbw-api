import { Injectable } from "@nestjs/common";

import { toTransactionDto, TransactionDTO } from "./transaction.entity";
import TransactionRepository from "./transaction.repository";

@Injectable()
export default class SimpleService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async findAll(): Promise<TransactionDTO[]> {
    const transactions = await this.transactionRepository.find();

    return transactions.map((tx) => toTransactionDto(tx));
  }
}
