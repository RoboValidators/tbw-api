import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Transactions } from "@arkecosystem/crypto";

import { ApiService } from "@services/api/api.service";
import TrueBlockWeightDTO from "@modules/tbw/dto/TrueBlockWeightDTO";
import { NetworkConfig } from "@config";

@Injectable()
export class BlockchainService {
  public validator: string;

  constructor(private apiService: ApiService, private configService: ConfigService) {}

  async processPayout(tbw: TrueBlockWeightDTO): Promise<any> {
    const networkConfig = await NetworkConfig.get();
    const { staticFees } = NetworkConfig.getFees();

    const passphrase = this.configService.get<string>("MNEMONIC");
    const secondPassphrase = this.configService.get<string | undefined>("SECOND_MNEMONIC");

    const nonce = await this.apiService.findNonce();

    const multiPayment = Transactions.BuilderFactory.multiPayment()
      .network(networkConfig.network.pubKeyHash)
      .version(2)
      .nonce(nonce)
      .fee(staticFees.multiPayment.toString());

    for (const recipient of Object.keys(tbw.rewards)) {
      multiPayment.addPayment(recipient, tbw.rewards[recipient]);
    }

    multiPayment.sign(passphrase);

    if (secondPassphrase) {
      multiPayment.secondSign(secondPassphrase);
    }

    const tx = multiPayment.getStruct();
    const txResult = await this.apiService.broadcast(tx);

    return [] as any;
  }
}
