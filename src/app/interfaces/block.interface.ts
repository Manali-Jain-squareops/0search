export interface IBlockRequestData {
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
  prev_verification_tickets: any;
  transactions: any;
  verification_tickets: any;
}
