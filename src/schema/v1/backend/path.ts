export default {
  '/docs': {
    get: {
      tags: ['Swagger'],
      summary: 'Swagger UI',
      responses: {
        '201': {
          description: 'Swagger UI generated'
        }
      }
    }
  },

  '/transaction/{hash}': {
    get: {
      tags: ['Transactions'],
      summary: 'API to get transaction by its hash',
      parameters: [
        {
          name: 'hash',
          in: 'path',
          description: 'Transaction hash',
          required: true,
          schema: {
            type: 'string',
            minimum: 1
          }
        }
      ],
      responses: {
        '200': {
          description: 'Returns transaction'
        }
      }
    }
  },

  '/transactions/search': {
    get: {
      tags: ['Transactions'],
      summary: 'API to search through transactions',
      parameters: [
        {
          name: 'hash',
          in: 'query',
          description: 'Hash of the transaction',
          schema: {
            type: 'string'
          }
        },
        {
          name: 'block_hash',
          in: 'query',
          description: 'Search transaction by block hash',
          schema: {
            type: 'string'
          }
        },
        {
          name: 'page',
          in: 'query',
          description: 'Page number',
          schema: {
            type: 'number'
          }
        },
        {
          name: 'size',
          in: 'query',
          description: 'Size of page',
          schema: {
            type: 'number'
          }
        }
      ],
      responses: {
        '200': {
          description: 'Returns transactions info'
        }
      }
    }
  },

  '/stats': {
    get: {
      tags: ['Statistics'],
      summary: 'API to get chain stats',
      responses: {
        '200': {
          description: 'Returns Statistics'
        }
      }
    }
  },

  '/blocks/search': {
    get: {
      tags: ['Block'],
      summary: 'Api to search through blocks',
      parameters: [
        {
          name: 'hash',
          in: 'query',
          description: 'Search key',
          schema: {
            type: 'string'
          }
        },
        {
          name: 'version',
          in: 'query',
          description: 'Search key',
          schema: {
            type: 'string'
          }
        },
        {
          name: 'round',
          in: 'query',
          description: 'Search key',
          schema: {
            type: 'string'
          }
        },
        {
          name: 'miner_id',
          in: 'query',
          description: 'Search key',
          schema: {
            type: 'string'
          }
        },
        {
          name: 'chain_id',
          in: 'query',
          description: 'Search key',
          schema: {
            type: 'string'
          }
        },
        {
          name: 'page',
          in: 'query',
          description: 'Page number',
          schema: {
            type: 'number'
          }
        },
        {
          name: 'size',
          in: 'query',
          description: 'Size of page',
          schema: {
            type: 'number'
          }
        }
      ],
      responses: {
        '200': {
          description: 'Blocks have been successfully fetched'
        }
      }
    }
  },

  '/blocks': {
    get: {
      tags: ['Block'],
      summary: 'API to get latest blocks',
      parameters: [
        {
          name: 'page',
          in: 'query',
          description: 'Page number',
          schema: {
            type: 'number'
          }
        },
        {
          name: 'size',
          in: 'query',
          description: 'Size of page',
          schema: {
            type: 'number'
          }
        }
      ],
      responses: {
        '200': {
          description: 'Blocks details have been successfully fetched'
        }
      }
    }
  },

  '/block': {
    get: {
      tags: ['Block'],
      summary: 'Get block by its hash or round',
      parameters: [
        {
          name: 'hash',
          in: 'query',
          description: 'hash',

          schema: {
            type: 'string'
          }
        },
        {
          name: 'round',
          in: 'query',
          description: 'round',

          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        '200': {
          description: 'Block have been successfully fetched'
        }
      }
    }
  },

  '/block/latest': {
    get: {
      tags: ['Block'],
      summary: 'Get latest block',
      parameters: [],
      responses: {
        '200': {
          description: 'latest block has been successfully fetched'
        }
      }
    }
  }
};
