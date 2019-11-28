export interface IStatsData {
  block_size: number;
  count: number;
  current_round: number;
  delta: number;
  latest_finalized_round: number;
  max: number;
  min: number;
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
