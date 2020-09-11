import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

import { AxiosResponse } from "axios";
import { ConfigService } from "@nestjs/config";

import {
  BlockResponse,
  WalletResponse,
  BlocksResponse,
  VoteTransactionResponse
} from "../../types/api";

@Injectable()
export class ApiService {
  private validator: string;

  constructor(private httpService: HttpService, private configService: ConfigService) {
    this.validator = this.configService.get<string>("VALIDATOR_NAME");
  }

  async findWallet(addressOrName = this.validator): Promise<WalletResponse> {
    const result = this.httpService.get(`/wallets/${addressOrName}`, {
      cache: {
        maxAge: 15 * 60 * 1000 // 15 minutes
      }
    });

    return this.extractData<WalletResponse>(result);
  }

  async findLastBlock(): Promise<BlockResponse> {
    const result = this.httpService.get("/blocks/last");
    return this.extractData<BlockResponse>(result);
  }

  async findAllBlocksByValidator(
    from: number,
    to: number,
    validator = this.validator
  ): Promise<BlocksResponse> {
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

    return this.extractData<BlocksResponse>(result);
  }

  async findVoteAge(addressOrName: string): Promise<any> {
    const wallet = await this.findWallet(this.validator);

    const result = this.httpService.get(`wallets/${addressOrName}/transactions?typeGroup=1&type=3`);
    const extractedResult = await this.extractData<VoteTransactionResponse>(result);

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
