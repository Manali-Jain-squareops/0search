import _ from 'lodash';
import Boom from '@hapi/boom';
import sanitize from 'mongo-sanitize';

export const validateQuery = async (query, supportedParams: Array<String>) => {
  query = _.pick(query, supportedParams);
  if (!query || Object.keys(query).length === 0) {
    throw Boom.badRequest(`Invalid query parameters. Please provide one of [${supportedParams.join(', ')}]`);
  }

  const sanitizedQuery = {};

  Object.entries(query).forEach(([key, value]) => (sanitizedQuery[key] = sanitize(value)));

  return sanitizedQuery;
};
