import config from 'config';
import Connector from '../../lib/0chain-connector';
import { fetchTransactionDetails } from './fetchTransactionDetails';
import { pollIncompleteTransactions } from './pollIncompleteTransactions';
import { fetchAndVerifyFileDetails } from './fetchAndVerifyFileDetails';

const blockchainConfig = config.get('blockchainConfig');

export const initProcessors = () => {
  const connector = new Connector(blockchainConfig);

  // initiates all queue processors
  fetchTransactionDetails(connector);
  pollIncompleteTransactions();
  fetchAndVerifyFileDetails(connector);
};
