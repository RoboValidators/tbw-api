import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

import { AxiosResponse } from "axios";
import { ConfigService } from "@nestjs/config";

import { Api } from "@types";
import { ITransactionData } from "@arkecosystem/crypto/dist/interfaces";

@Injectable()
export class ApiService {
  private validator: string;

  constructor(private httpService: HttpService, private configService: ConfigService) {
    this.validator = this.configService.get<string>("VALIDATOR_NAME");
  }

  async findWalletCached(addressOrName = this.validator): Promise<Api.WalletResponse> {
    const result = this.httpService.get(`/wallets/${addressOrName}`, {
      cache: {
        maxAge: 15 * 60 * 1000 // 15 minutes
      }
    });

    return this.extractData<Api.WalletResponse>(result);
  }

  async findWallet(addressOrName = this.validator): Promise<Api.WalletResponse> {
    const result = this.httpService.get(`/wallets/${addressOrName}`);
    return this.extractData<Api.WalletResponse>(result);
  }

  async findNonce(addressOrName = this.validator): Promise<string> {
    const result = await this.findWallet(addressOrName);
    return result.data.nonce;
  }

  async broadcast(tx: ITransactionData): Promise<any> {
    const result = this.httpService.post("/transactions", {
      transactions: [tx]
    });

    console.log("begin");
    console.log(JSON.stringify(result, null, 4));
    console.log("end");

    return result;
  }

  async findLastBlock(): Promise<Api.BlockResponse> {
    const result = this.httpService.get("/blocks/last");
    return this.extractData<Api.BlockResponse>(result);
  }

  async findAllBlocksByValidator(
    from: number,
    to: number,
    validator = this.validator
  ): Promise<Api.BlocksResponse> {
    const wallet = await this.findWallet(validator);

    if (!to) {
      to = (await this.findLastBlock()).data.height;
    }

    const result = this.httpService.post("/blocks/search", {
      generatorPublicKey: wallet.data.publicKey,
      height: {
        from,
        to
      }
    });

    return this.extractData<Api.BlocksResponse>(result);
  }

  async findVoteAge(addressOrName: string): Promise<any> {
    const wallet = await this.findWallet(this.validator);

    const result = this.httpService.get(`wallets/${addressOrName}/transactions?typeGroup=1&type=3`);
    const extractedResult = await this.extractData<Api.VoteTransactionResponse>(result);

    const lastVoteTx = extractedResult.data[0];

    if (lastVoteTx.asset.votes[0] === `+${wallet.data}`) {
      if (lastVoteTx.timestamp.human) {
      }
    }

    return {
      // vote,
      // age
    };
  }

  async fetch<T>(url: string): Promise<T> {
    const result = this.httpService.get(url);
    return this.extractData<T>(result);
  }

  async extractData<T>(request: Observable<AxiosResponse<T>>): Promise<T> {
    const resolvedRequest = await request.toPromise();
    return resolvedRequest.data;
  }
}
