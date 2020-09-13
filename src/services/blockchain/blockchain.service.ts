import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Transactions } from "@arkecosystem/crypto";

import { ApiService } from "@services/api/api.service";
import TrueBlockWeightDTO from "@modules/tbw/dto/TrueBlockWeightDTO";
import { NetworkConfig } from "@config";
import BigNumber from "bignumber.js";

@Injectable()
export class BlockchainService {
  public validator: string;

  constructor(private apiService: ApiService, private configService: ConfigService) {}

  async processPayout(tbw: TrueBlockWeightDTO): Promise<void> {
    const networkConfig = await NetworkConfig.get();
    const { staticFees } = NetworkConfig.getFees();

    const passphrase = this.configService.get<string>("MNEMONIC");
    const secondPassphrase = this.configService.get<string | undefined>("SECOND_MNEMONIC");

    const nextNonce = await this.apiService.findNextNonce();

    const multiPayment = Transactions.BuilderFactory.multiPayment()
      .network(networkConfig.network.pubKeyHash)
      .version(2)
      .nonce(nextNonce)
      .fee(staticFees.multiPayment.toString());

    for (const recipient of Object.keys(tbw.rewards)) {
      const amount = new BigNumber(tbw.rewards[recipient]).times(1e8).toFixed(0);
      multiPayment.addPayment(recipient, amount);
    }

    multiPayment.sign(passphrase);

    if (secondPassphrase) {
      multiPayment.secondSign(secondPassphrase);
    }

    const tx = multiPayment.getStruct();
    await this.apiService.broadcast(tx);
  }
}
