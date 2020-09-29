import { Injectable } from "@nestjs/common";
import { Api } from "@types";
import { buildPaginationMeta } from "@util/pagination";

import { toTransactionDto } from "./transaction.entity";
import TransactionRepository from "./transaction.repository";
import TransactionCountRepository from "./transactionCount.repository";

@Injectable()
export default class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly txCountRepository: TransactionCountRepository
  ) {}

  async findAllPaginated(
    page: number,
    limit: number,
    path: string
  ): Promise<Api.TransactionResponseDTO> {
    const result = await this.transactionRepository.findAllPaginated(page, limit);
    const transactions = result.map((tx) => toTransactionDto(tx));

    const count = await this.txCountRepository.findById(this.txCountRepository.id);
    const meta = buildPaginationMeta(count.length, page, limit, path);

    return {
      meta: meta.meta,
      data: transactions
    };
  }
}
