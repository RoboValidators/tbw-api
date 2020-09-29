import { TransactionDTO } from "@modules/transaction/transaction.entity";
import { VoterDTO } from "@modules/voter/voter.entity";

import { BlockDTO, WalletDTO, VoteTransaction, Configuration, Broadcast } from "./blockchain";

export interface MetaResponse {
  meta: {
    totalCountIsEstimate?: boolean;
    count: number;
    pageCount: number;
    totalCount: number;
    next: string | null;
    previous: string | null;
    self: string;
    first: string;
    last: string;
  };
}

export interface TransactionResponseDTO extends MetaResponse {
  data: TransactionDTO[];
}
export interface VoterResponseDTO extends MetaResponse {
  data: VoterDTO[];
}

export interface BlockResponse extends MetaResponse {
  data: BlockDTO;
}

export interface BlocksResponse extends MetaResponse {
  data: BlockDTO[];
}

export interface VoteTransactionResponse extends MetaResponse {
  data: VoteTransaction[];
}

// Doesn't contain meta data
export interface WalletResponse {
  data: WalletDTO;
}

// Doesn't contain meta data
export interface ConfigResponse {
  data: Configuration;
}

// Doesn't contain meta data
export interface BroadcastResponse {
  data: Broadcast;
}
