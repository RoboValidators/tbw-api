import { ConflictException, Injectable, Logger } from "@nestjs/common";
import BigNumber from "bignumber.js";
import { ConfigService } from "@nestjs/config";

import { BlockchainService } from "@services/blockchain/blockchain.service";
import { toVoterDto, VoterDTO } from "@modules/voter/voter.entity";
import VoterRepository from "@modules/voter/voter.repository";
import Transaction from "@modules/transaction/transaction.entity";
import { Api } from "@types";
import { buildPaginationMeta } from "@util/pagination";

import VoterCountRepository from "./voterCount.repository";

@Injectable()
export default class VoterService {
  private readonly logger = new Logger(VoterService.name);

  constructor(
    private readonly bcService: BlockchainService,
    private readonly voterRepository: VoterRepository,
    private readonly voterCountRepository: VoterCountRepository,
    private readonly configService: ConfigService
  ) {}

  async findAllPaginated(page: number, limit: number, path: string): Promise<Api.VoterResponseDTO> {
    const result = await this.voterRepository.findAllPaginated(page, limit);
    const voters = result.map((voter) => toVoterDto(voter));

    const count = await this.voterCountRepository.upsert(result.length);
    const meta = buildPaginationMeta(count, page, limit, path);

    return {
      meta: meta.meta,
      data: voters
    };
  }

  async calculatePayouts(): Promise<VoterDTO[]> {
    const voters = await this.voterRepository.find();

    this.logger.log(`Payout for ${voters.length} voters since the last payout`);
    console.table(voters, ["wallet", "paidBalance", "pendingBalance"]);

    return voters.map((voters) => toVoterDto(voters));
  }

  async processPayouts(): Promise<Transaction[]> {
    const payouts = await this.calculatePayouts();
    const minPayout = this.configService.get<number>("MIN_PAYOUT");

    const filteredPayouts = payouts.filter((voter) =>
      new BigNumber(voter.pendingBalance).isGreaterThan(minPayout)
    );

    if (filteredPayouts.length < 2) {
      throw new ConflictException("Not enough payments are eligable for processing");
    }

    return this.bcService.processPayout(filteredPayouts);
  }
}
