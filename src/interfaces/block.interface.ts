import { ITransactionData, IVerificationTicketData } from './index';
import { IStatsData } from './stats.interface';

// Camel casing is not done as data is added to the database as received from the SDK for maintaining consistency
export interface IBlockData {
  version: string;
  creation_date: number;
  magic_block_hash: string;
  prev_hash: string;
  miner_id: string;
  round: number;
  round_random_seed: number;
  round_timeout_count: number;
  state_hash: string;
  hash: string;
  signature: string;
  chain_id: string;
  chain_weight: number;
  num_txns: number;
  prev_verification_tickets: IVerificationTicketData[];
  transactions: ITransactionData[];
  verification_tickets: IVerificationTicketData[];
  chain_stats: IStatsData;
}
