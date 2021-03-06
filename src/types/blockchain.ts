import { Interfaces } from "@arkecosystem/crypto";

export type Block = Interfaces.IBlockData;

export interface BlockDTO {
  id: string;
  version: number;
  height: number;
  previous: string;
  forged: {
    reward: string;
    collectiveFee: string;
    fee: string;
    removedFee: string;
    total: string;
    amount: string;
  };
  payload: {
    hash: string;
    length: number;
  };
  generator: {
    username: string;
    address: string;
    publicKey: string;
  };
  signature: string;
  confirmations: number;
  transactions: number;
  timestamp: Timestamp;
}

export interface Delegate {
  username: string;
  voteBalance: string;
  forgedFees: string;
  removedFees: string;
  forgedRewards: string;
  producedBlocks: number;
  rank: number;
  lastBlock: Block;
  round: number;
}

export interface WalletDTO {
  address: string;
  publicKey: string;
  nonce: string;
  balance: string;
  gracedBalance: string;
  isDelegate: boolean;
  isResigned: boolean;
  vote: string;
  stakePower: string;
  power: string;
  stakes: any; // TODO
  files: {
    logo: string;
    description: string;
  };
  attributes: {
    delegate: Delegate;
  };
  username: string;
  secondPublicKey: string;
}

export interface TransactionBase {
  id: string;
  blockId: string;
  version: number;
  type: number;
  typeGroup: number;
  amount: string;
  fee: string;
  sender: string;
  senderPublicKey: string;
  recipient: string;
  signature: string;
  confirmations: number;
  timestamp: Timestamp;
  nonce: string;
}

export interface VoteTransaction extends TransactionBase {
  asset: {
    votes: string[];
  };
}

export interface Timestamp {
  epoch: number;
  unix: number;
  human: string;
}

export interface StaticFees {
  transfer: number;
  secondSignature: number;
  delegateRegistration: number;
  vote: number;
  multiSignature: number;
  multiPayment: number;
  delegateResignation: number;
  stakeCreate: number;
  stakeRedeem: number;
  stakeCancel: number;
  setFile: number;
}

export interface Fees {
  staticFees: StaticFees;
}

export interface Configuration {
  constants: {
    fees: Fees;
  };
}

export interface Broadcast {
  accept: string[];
  broadcast: string[];
  excess: string[];
  invalid: string[];
}
