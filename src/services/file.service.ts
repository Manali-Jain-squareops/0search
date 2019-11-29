import File from '../entities/file.entity';
import { IFileData } from '../interfaces'
import logger from '../lib/logger'

// TODO: This is constructed out of assumption that we get document data in txn payload
class FileService {

  add = async (fileMetadata: IFileData) => {
    try {
      await File.create([fileMetadata]);
      logger.info(`File metadata Stored successfully`);

    } catch (error) {
      logger.error(`Error in store file data, ${error}`);
      throw new Error(`Error in store file data`)
    }
  }
}

export const fileService = new FileService()
