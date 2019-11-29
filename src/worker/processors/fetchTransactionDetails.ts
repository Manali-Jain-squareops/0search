import of from 'await-of';
import config from 'config';
import { fetchTransactionDetailsQueue } from '../queues';
import { transactionService } from '../../services/transaction.service';
import logger from '../../lib/logger';
import Connector from '../../lib/0chain-connector';
import { addFetchAndVerifyFileDetailsJob } from '../jobs';
import { FETCH_TRANSACTION_DETAILS_PROCESS } from '../constants';

const JOB_CONCURRENCY = config.get('worker.jobConcurrency');

export const fetchTransactionDetails = (connector: Connector) => {
  fetchTransactionDetailsQueue.process(
    FETCH_TRANSACTION_DETAILS_PROCESS,
    JOB_CONCURRENCY,
    async (job: any, jobDone: any) => {
      const txnHash = job.data.transactionHash;
      logger.info(`Fetching transactions details for transaction: ${txnHash}`);

      const [txnDetails, err] = await of(connector.getTransactionDetails(txnHash));
      if (err) {
        logger.error(`Error fetching txnDetails of ${txnHash} from sdk`, err);
        return jobDone(err);
      }

      const [_, error] = await of(transactionService.addConfirmationDetails(txnHash, txnDetails.confirmation));
      if (error) {
        logger.error(`Error updating txnDetails of txn: ${txnHash}`, err);
        return jobDone(error);
      }

      logger.info(`Fetched transactions details for transaction: ${txnHash}`);

      // TODO: This is done in the assumption that storage type txns have lookup_hash, actual file hash in tx output payload
      if (txnDetails.transaction_output) {
        const txOutput = JSON.parse(txnDetails.transaction_output);
        if (txOutput.lookup_hash && txOutput.actual_file_hash) {
          const fileMetaData = txOutput;
          addFetchAndVerifyFileDetailsJob(fileMetaData);
        }
      }

      return jobDone();
    }
  );
};
