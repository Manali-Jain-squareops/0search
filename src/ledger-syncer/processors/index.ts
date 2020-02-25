import config from 'config';
import Connector from '../../lib/0chain-connector';
// import { fetchBlockDetails } from './fetchBlockDetails';
import { pollLatestBlocks } from './fetchLatestBlocks';

const blockchainConfig = config.get('blockchainConfig');

export const initProcessors = () => {
  const connector = new Connector(blockchainConfig);
  // initiates all queue processors
  pollLatestBlocks(connector);  
};
