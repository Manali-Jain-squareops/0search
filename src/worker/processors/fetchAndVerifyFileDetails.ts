import of from 'await-of';
import config from 'config';
import { fetchTransactionDetailsQueue } from '../queues';
import { fileService } from '../../services/file.service';
import logger from '../../lib/logger';
import Connector from '../../lib/0chain-connector';
import { FETCH_AND_VERIFY_FILE_DETAILS_PROCESS } from '../constants';

const JOB_CONCURRENCY = config.get('worker.jobConcurrency');

// TODO: This is constructed out of assumption that we get document data in txn payload
export const fetchAndVerifyFileDetails = (connector: Connector) => {
  fetchTransactionDetailsQueue.process(
    FETCH_AND_VERIFY_FILE_DETAILS_PROCESS,
    JOB_CONCURRENCY,
    async (job: any, jobDone: any) => {
      const fileMetadata = job.data.fileMetadata;
      logger.info(`Verifying authenticity of the file: ${fileMetadata.actual_file_hash}`);

      const [verified, err] = await of(connector.verifyFile(fileMetadata));
      if (err) {
        logger.error(`Error verifying file ${fileMetadata.actual_file_hash} from sdk`, err);
        return jobDone(err);
      }

      fileMetadata.verified = verified;

      const [_, error] = await of(fileService.add(fileMetadata));
      if (error) {
        logger.error(`Error adding file details in DB: ${fileMetadata.actual_file_hash}`, err);
        return jobDone(error);
      }

      logger.info(`Added file ${fileMetadata.actual_file_hash} in the database`);
      return jobDone();
    }
  );
};
