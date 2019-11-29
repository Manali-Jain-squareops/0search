// Camel casing is not done as data is added to the database as received from the SDK for maintaining consistency
export interface IStatsData {
  block_hash: string;
  block_size: number;
  count: number;
  current_round: number;
  delta: number;
  max: number;
  min: number;
  mean: number;
  percentile_50: number;
  percentile_90: number;
  percentile_95: number;
  percentile_99: number;
  rate_15_min: number;
  rate_1_min: number;
  rate_5_min: number;
  rate_mean: number;
  std_dev: number;
  total_txns: number;
}
