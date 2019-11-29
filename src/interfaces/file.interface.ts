// TODO: The following data is assumed to be available in transaction payload. Will be chnaged once implemented
export interface IFileData {
  actual_file_hash: string;
  actual_file_size: string;
  actual_thumbnail_hash: string;
  actual_thumbnail_size: number;
  content_hash: string;
  custom_meta: string;
  encrypted_key: string;
  hash: string;
  lookup_hash: string;
  merkle_root: string;
  mimetype: string;
  name: string;
  num_of_blocks: number;
  path: string;
  path_hash: string;
  size: number;
  thumbnail_hash: string;
  type: string;
  verified: boolean;
}
