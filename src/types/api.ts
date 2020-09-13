import { BlockDTO, WalletDTO, VoteTransaction, Configuration } from "./blockchain";

interface MetaResponse {
  meta: {
    totalCountIsEstimate: boolean;
    count: number;
    pageCount: number;
    totalCount: number;
    next: string;
    previous: string | null;
    self: string;
    first: string;
    last: string;
  };
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
