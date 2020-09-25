import { Injectable } from "@nestjs/common";

import { toTransactionDto, TransactionsDTO } from "./transaction.entity";
import TransactionRepository from "./transaction.repository";

@Injectable()
export default class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  buildPagination(
    data: any,
    count: number,
    page: number,
    limit: number,
    path: string
  ): TransactionsDTO {
    const pageCount = Math.ceil(count / limit);
    const next = page + 1;
    const prev = page - 1;

    return {
      meta: {
        count: limit,
        pageCount,
        totalCount: count,
        next: page >= pageCount ? null : `${path}?page=${next}&limit=${limit}`,
        previous: page <= 1 ? null : `/transactions?page=${prev}&limit=${limit}`,
        self: `${path}?page=${page}&limit=${limit}`,
        first: `${path}?page=1&limit=${limit}`,
        last: `${path}?page=${pageCount}&limit=${limit}`
      },
      data
    };
  }

  async findAll(page: number, limit: number, path: string): Promise<TransactionsDTO> {
    const result = await this.transactionRepository.getPaginated(page, limit);
    const transactions = result.transactions.map((tx) => toTransactionDto(tx));

    return this.buildPagination(transactions, result.count, page, limit, path);
  }
}
