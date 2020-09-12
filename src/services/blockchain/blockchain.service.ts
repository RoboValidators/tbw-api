import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { ApiService } from "@services/api/api.service";
import { Blockchain } from "@types";

@Injectable()
export class BlockchainService {
  public validator: string;

  constructor(private apiService: ApiService, private configService: ConfigService) {}

  findAllBlocksByValidator(): Blockchain.BlockDTO {
    return [] as any;
  }
}
