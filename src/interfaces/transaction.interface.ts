// Camel casing is not done as data is added to the database as received from the SDK for maintaining consistency
export interface ITransactionData {
  hash: string;
  block_hash: string;
  version: string;
  from: string;
  to: string;
  chain_id: string;
  transaction_data: string;
  transaction_value: string;
  signature: string;
  creation_date: string;
  transaction_fee: string;
  transaction_type: string;
  transaction_output: string;
  transaction_output_hash: string;
  transaction_status: string;
  confirmation_fetched: boolean;
}
