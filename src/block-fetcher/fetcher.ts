import Block from "../entities/block";
import jsClientSdk from 'js-client';
import Request from '../lib/request'

import config from 'config'

const baseUrl = config.get('baseUrl')

class Fetcher {
  constructor() {
    this.latestBlock = this.latestBlockNumber() || 0
    const request = new Request(baseUrl, {});
    request.get('/explorer-settings.json', {}, {})

    if (request.status === 200) {
      self.jsClientSdkInstance = jsClientSdk;
      self.jsClientSdkInstance.init(JSON.parse(request.responseText));
    }

    this.jsClientSdkInstance = jsClientSdk;
  }

  latestBlockNumber = async () => {
    const block = await Block.sort(['round']).limit(1)
  }

  run = async () => {
    try {

    }catch(error) {

    }
  }
}
