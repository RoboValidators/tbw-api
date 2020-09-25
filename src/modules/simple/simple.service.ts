import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import BigNumber from "bignumber.js";
import { ConfigService } from "@nestjs/config";

import { BlockchainService } from "@services/blockchain/blockchain.service";
import { toVoterDto, VoterDTO } from "@services/voter/voter.entity";
import VoterRepository from "@services/voter/voter.repository";
import Transaction from "@modules/transaction/transaction.entity";

@Injectable()
export default class SimpleService {
  private readonly logger = new Logger(SimpleService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly bcService: BlockchainService,
    private readonly voterRepository: VoterRepository
  ) {}

  async calculatePayouts(): Promise<VoterDTO[]> {
    const voters = await this.voterRepository.find();

    this.logger.log(`Payout for ${voters.length} voters since the last payout`);
    console.table(voters);

    return voters.map((voters) => toVoterDto(voters));
  }

  async processPayouts(): Promise<Transaction[]> {
    const payouts = await this.calculatePayouts();
    const minPayout = this.configService.get<number>("MIN_PAYOUT");

    const filteredPayouts = payouts.filter((voter) =>
      new BigNumber(voter.pendingBalance).isGreaterThan(minPayout)
    );

    if (filteredPayouts.length < 2) {
      throw new NotFoundException("Not enough payments are eligable for processing");
    }

    return this.bcService.processPayout(filteredPayouts);
  }
}
