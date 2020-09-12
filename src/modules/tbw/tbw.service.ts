import { Injectable, Logger } from "@nestjs/common";
import BigNumber from "bignumber.js";

import { Rewards } from "../../types";

import TrueBlockWeightModel from "./tbw.entity";
import TbwRepository from "./tbw.repository";

@Injectable()
export default class TbwService {
  private readonly logger = new Logger(TbwService.name);

  constructor(private readonly tbwRepository: TbwRepository) {}

  async findBetweenBlocks(from: number, to: number): Promise<TrueBlockWeightModel[]> {
    return this.tbwRepository.findBetweenBlocks(from, to);
  }

  async calculatePayouts(from: number, to: number): Promise<Rewards> {
    const tbws = await this.tbwRepository.findBetweenBlocks(from, to);

    const payoutPerWallet = tbws.reduce((acc, tbw) => {
      tbw.voters.forEach((voter) => {
        const previousReward = new BigNumber(acc[voter.wallet] || 0);
        acc = { ...acc, [voter.wallet]: previousReward.plus(voter.reward).toString() };
      });

      return acc;
    }, {});

    this.logger.log(`Payout for the past ${tbws.length} blocks`);
    console.table(payoutPerWallet);

    return payoutPerWallet;
  }
}
