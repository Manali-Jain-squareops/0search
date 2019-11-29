// Camel casing is not done as data is added to the database as received from the SDK
interface ITreePathData {
  leaf_index: string;
  nodes: string[];
}

export interface IConfirmationData {
  hash: string;
  version: string;
  block_hash: string;
  creation_date: number;
  round: number;
  round_random_seed: string;
  merkle_tree_root: string;
  receipt_merkle_tree_root: string;
  merkle_tree_path: ITreePathData;
  receipt_merkle_tree_path: ITreePathData;
}
