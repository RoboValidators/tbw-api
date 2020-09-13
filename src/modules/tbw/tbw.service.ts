import { Injectable, Logger } from "@nestjs/common";
import BigNumber from "bignumber.js";
import { uniqBy } from "lodash";

import { Rewards } from "@types";

import { BlockchainService } from "@services/blockchain/blockchain.service";

import TbwRepository from "./tbw.repository";
import TrueBlockWeightDTO from "./dto/TrueBlockWeightDTO";
import TrueBlockWeight from "./tbw.entity";

@Injectable()
export default class TbwService {
  private readonly logger = new Logger(TbwService.name);

  constructor(
    private readonly bcService: BlockchainService,
    private readonly tbwRepository: TbwRepository
  ) {}

  async findBetweenBlocks(from: number, to: number): Promise<TrueBlockWeight[]> {
    return this.tbwRepository.findBetweenBlocks(from, to);
  }

  async calculatePayouts(from: number, to: number): Promise<TrueBlockWeightDTO> {
    const tbws = await this.tbwRepository.findBetweenBlocks(from, to);

    let totalValidatorFee = new BigNumber(0);
    let totalLicenseFee = new BigNumber(0);
    let totalVotersRewards = new BigNumber(0);
    let totalBlockRewards = new BigNumber(0);

    const uniqueTbws: TrueBlockWeight[] = uniqBy(tbws, "block");
    const payoutPerWallet: Rewards = uniqueTbws.reduce((acc, tbw) => {
      totalBlockRewards = totalBlockRewards.plus(tbw.blockReward);
      totalValidatorFee = totalValidatorFee.plus(tbw.validatorFee);
      totalLicenseFee = totalLicenseFee.plus(tbw.licenseFee);

      tbw.voters.forEach((voter) => {
        const previousReward = new BigNumber(acc[voter.wallet] || 0);
        acc = { ...acc, [voter.wallet]: previousReward.plus(voter.reward).toFixed(8) };

        totalVotersRewards = totalVotersRewards.plus(voter.reward);
      });

      return acc;
    }, {});

    this.logger.log(`Payout for the past ${tbws.length} blocks`);
    console.table(payoutPerWallet);

    const totalTbw = new TrueBlockWeightDTO();
    totalTbw.fromBlock = from;
    totalTbw.toBlock = to;
    totalTbw.rewards = payoutPerWallet;
    totalTbw.licenseFee = totalLicenseFee.toFixed(8);
    totalTbw.validatorFee = totalValidatorFee.toFixed(8);
    totalTbw.blockReward = totalBlockRewards.toFixed(8);
    totalTbw.votersReward = totalVotersRewards
      .minus(totalValidatorFee)
      .minus(totalLicenseFee)
      .toFixed(8);

    return totalTbw;
  }

  async processPayouts(from: number, to: number): Promise<TrueBlockWeightDTO> {
    const tbw = await this.calculatePayouts(from, to);
    await this.bcService.processPayout(tbw);
    return tbw;
  }
}
