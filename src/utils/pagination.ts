import Boom from '@hapi/boom';
import config from 'config';
import { IMetaData } from '../interfaces';

const DEFAULT_PAGE: number = config.get('pagination.default_page') || 1;
const DEFAULT_PAGE_SIZE: number = config.get('pagination.default_page_size') || 10;

export class Pagination {
  static async getOffsetAndLimit(page: number = DEFAULT_PAGE, size: number = DEFAULT_PAGE_SIZE): Promise<any> {
    page = Number(page);
    size = Number(size);

    if (page <= 0 || size <= 0) {
      throw Boom.badRequest('Invalid pagination params');
    }

    return {
      skip: (page - 1) * size,
      limit: size
    };
  }

  static preparePaginationMetaData(
    page: number = DEFAULT_PAGE,
    size: number = DEFAULT_PAGE_SIZE,
    totalCount: number
  ): IMetaData {
    page = Number(page);
    size = Number(size);

    return {
      page,
      per_page: size,
      page_count: Math.ceil(totalCount / size),
      total_count: totalCount,
      first: page === 1,
      last: page * size >= totalCount
    };
  }
}
