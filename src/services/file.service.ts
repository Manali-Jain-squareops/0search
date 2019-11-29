import Boom from '@hapi/boom';
import logger from '../lib/logger';
import File from '../entities/file.entity';
import { IFileData } from '../interfaces';

// TODO: This is constructed out of assumption that we get document data in txn payload
class FileService {
  add = async (fileMetadata: IFileData) => {
    try {
      await File.create([fileMetadata]);
      logger.info('File metadata Stored successfully');
    } catch (error) {
      logger.error('Error in store file data', error);
      throw Boom.badRequest(`Error in store file data`);
    }
  };
}

export const fileService = new FileService();
