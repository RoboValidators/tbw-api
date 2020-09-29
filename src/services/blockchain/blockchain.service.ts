import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Transactions } from "@arkecosystem/crypto";
import BigNumber from "bignumber.js";

import { ApiService } from "@services/api/api.service";
import TrueBlockWeightDTO from "@modules/tbw/dto/TrueBlockWeightDTO";
import { NetworkConfig } from "@config";
import VoterRepository from "@services/voter/voter.repository";

@Injectable()
export class BlockchainService {
  public validator: string;

  constructor(
    private readonly voterRepository: VoterRepository,
    private readonly apiService: ApiService,
    private readonly configService: ConfigService
  ) {}

  async processPayout(tbw: TrueBlockWeightDTO): Promise<void> {
    // Retrieve network config
    const networkConfig = await NetworkConfig.get();
    const { staticFees } = NetworkConfig.getFees();

    // Get passphrases
    const passphrase = this.configService.get<string>("MNEMONIC");
    const secondPassphrase = this.configService.get<string | undefined>("SECOND_MNEMONIC");

    // Find next nonce and all voters (with paid and pending balances)
    const nextNonce = await this.apiService.findNextNonce();
    const voters = await this.voterRepository.find();

    // Start building multi tx
    const multiPayment = Transactions.BuilderFactory.multiPayment()
      .network(networkConfig.network.pubKeyHash)
      .version(2)
      .nonce(nextNonce)
      .fee(staticFees.multiPayment.toString());

    // Upsert voter and add to multi payment
    for (const recipient of Object.keys(tbw.rewards)) {
      const amount = tbw.rewards[recipient];
      const foundPayout = voters.find((voter) => voter.wallet === recipient);

      if (foundPayout) {
        await this.voterRepository.update({
          id: foundPayout.id,
          wallet: foundPayout.wallet,
          paidBalance: new BigNumber(foundPayout.paidBalance).plus(amount).toFixed(8),
          pendingBalance: "0"
        });
      } else {
        await this.voterRepository.create({
          id: recipient,
          wallet: recipient,
          paidBalance: amount,
          pendingBalance: "0"
        });
      }

      multiPayment.addPayment(recipient, new BigNumber(amount).times(1e8).toFixed(0));
    }

    // First signature
    multiPayment.sign(passphrase);

    // Second signature
    if (secondPassphrase) {
      multiPayment.secondSign(secondPassphrase);
    }

    // Broadcast transaction (throw badRequest if fails)
    const tx = multiPayment.getStruct();
    await this.apiService.broadcast(tx);
  }
}
