import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Transactions } from "@arkecosystem/crypto";
import BigNumber from "bignumber.js";

import { ApiService } from "@services/api/api.service";
import TrueBlockWeightDTO from "@modules/tbw/dto/TrueBlockWeightDTO";
import { NetworkConfig } from "@config";
import VoterRepository from "@modules/voter/voter.repository";
import { VoterDTO } from "@modules/voter/voter.entity";
import Transaction from "@modules/transaction/transaction.entity";
import TransactionRepository from "@modules/transaction/transaction.repository";

@Injectable()
export class BlockchainService {
  public validator: string;

  constructor(
    private readonly voterRepository: VoterRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly apiService: ApiService,
    private readonly configService: ConfigService
  ) {}

  async getbaseMultiPayment() {
    // Retrieve network config
    const networkConfig = await NetworkConfig.get();
    const { staticFees } = NetworkConfig.getFees();

    // Find next nonce
    const nextNonce = await this.apiService.findNextNonce();

    // Start building multi tx
    return Transactions.BuilderFactory.multiPayment()
      .network(networkConfig.network.pubKeyHash)
      .version(2)
      .nonce(nextNonce)
      .fee(staticFees.multiPayment.toString());
  }

  async broadcastMultipayment(multiPayment: Transactions.TransactionBuilder<any>): Promise<string> {
    // Get passphrases
    const passphrase = this.configService.get<string>("MNEMONIC");
    const secondPassphrase = this.configService.get<string | undefined>("SECOND_MNEMONIC");

    // First signature
    multiPayment.sign(passphrase);

    // Second signature
    if (secondPassphrase) {
      multiPayment.secondSign(secondPassphrase);
    }

    // Broadcast transaction (throw badRequest if fails)
    const tx = multiPayment.getStruct();
    return this.apiService.broadcast(tx);
  }

  async processPayout(voters: VoterDTO[]): Promise<Transaction[]> {
    const multiPayment = await this.getbaseMultiPayment();
    const voterBatch = this.voterRepository.createBatch();
    const txs = [];

    // Update voters and add to multi payment
    for (const voter of voters) {
      voterBatch.update({
        id: voter.id,
        wallet: voter.wallet,
        paidBalance: new BigNumber(voter.paidBalance).plus(voter.pendingBalance).toFixed(8),
        pendingBalance: "0"
      });

      txs.push({
        amount: voter.pendingBalance,
        wallet: voter.id
      });
      multiPayment.addPayment(voter.id, new BigNumber(voter.pendingBalance).times(1e8).toFixed(0));
    }

    const txId = await this.broadcastMultipayment(multiPayment);
    await voterBatch.commit();

    return this.transactionRepository.addTransactions(txs, txId);
  }

  async processPayoutTbw(tbw: TrueBlockWeightDTO): Promise<Transaction[]> {
    // Get multiPaymentBase and all voters
    const multiPayment = await this.getbaseMultiPayment();
    const voters = await this.voterRepository.find();
    const voterBatch = this.voterRepository.createBatch();
    const txs = [];

    // Update voters and add to multi payment
    for (const recipient of Object.keys(tbw.rewards)) {
      const amount = tbw.rewards[recipient];
      const foundPayout = voters.find((voter) => voter.id === recipient);

      if (foundPayout) {
        voterBatch.update({
          id: foundPayout.id,
          wallet: foundPayout.wallet,
          paidBalance: new BigNumber(foundPayout.paidBalance).plus(amount).toFixed(8),
          pendingBalance: "0"
        });
      } else {
        voterBatch.create({
          id: recipient,
          wallet: recipient,
          paidBalance: amount,
          pendingBalance: "0"
        });
      }

      txs.push({
        amount,
        wallet: recipient
      });
      multiPayment.addPayment(recipient, new BigNumber(amount).times(1e8).toFixed(0));
    }

    const txId = await this.broadcastMultipayment(multiPayment);
    await voterBatch.commit();

    return this.transactionRepository.addTransactions(txs, txId);
  }
}
