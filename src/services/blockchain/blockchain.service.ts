import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { ApiService } from "../api/api.service";
import { BlockDTO } from "../../types/blockchain";

@Injectable()
export class BlockchainService {
  public validator: string;

  constructor(private apiService: ApiService, private configService: ConfigService) {}

  findAllBlocksByValidator(): BlockDTO {
    return [] as any;
  }
}
