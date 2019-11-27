//import { jsClientSdkInstance, storageSDKInstance } from '/imports/startup/client/index.js';

// Consuming JsClient Library

import jsClientSdk from 'js-client';

// export const config = {
//   miners: [
//     'http://localhost:7071/',
//     'http://localhost:7072/',
//     'http://localhost:7073/'
//   ],
//   sharders: ['http://localhost:7171/'],
//   clusterName: 'local',
//   transaction_timeout: 15,
//   state: true
// };

// export let config = {
//   miners: [
//     'http://m000.devb.testnet-0chain.net:7071/',
//     'http://m001.devb.testnet-0chain.net:7071/',
//     'http://m002.devb.testnet-0chain.net:7071/',
//     'http://m003.devb.testnet-0chain.net:7071/'
//   ],
//   sharders: [
//     'http://s000.devb.testnet-0chain.net:7171/',
//     'http://s001.devb.testnet-0chain.net:7171/'
//   ],
//   chain_id: 'devb',
//   clusterName: 'devb',
//   transaction_timeout: 15,
//   state: true
// };

export let config = {
  miners: [
    'http://ohio.devi.testnet-0chain.net:7073/',
    'http://ohio.devi.testnet-0chain.net:7072/',
    'http://ohio.devi.testnet-0chain.net:7071/',
    'http://ohio.devi.testnet-0chain.net:7074/'
  ],
  sharders: ['http://ohio.devi.testnet-0chain.net:7171/'],
  signaturescheme: 'bls0chain',
  confirmation_chain_length: 3
};

// export const config = {
//   miners: [
//     'http://m000.ruby.alphanet-0chain.net:7071/',
//     'http://m001.ruby.alphanet-0chain.net:7071/',
//     'http://m002.ruby.alphanet-0chain.net:7071/',
//     'http://m003.ruby.alphanet-0chain.net:7071/',
//     'http://m004.ruby.alphanet-0chain.net:7071/',
//     'http://m005.ruby.alphanet-0chain.net:7071/',
//     'http://m006.ruby.alphanet-0chain.net:7071/',
//     'http://m007.ruby.alphanet-0chain.net:7071/',
//     'http://m008.ruby.alphanet-0chain.net:7071/',
//     'http://m009.ruby.alphanet-0chain.net:7071/'
//   ],
//   sharders: [
//     'http://s000.ruby.alphanet-0chain.net:7171/',
//     'http://s001.ruby.alphanet-0chain.net:7171/',
//     'http://s002.ruby.alphanet-0chain.net:7171/',
//     'http://s003.ruby.alphanet-0chain.net:7171/'
//   ],
//   chain_id: 'ruby.alphanet',
//   clusterName: 'ruby.alphanet',
//   transaction_timeout: 15,
//   state: true
// }

class RestApiManager {
  constructor() {
    let self = this;

    var request = new XMLHttpRequest();
    request.open(
      'GET',
      `${process.env.PUBLIC_URL}/explorer-settings.json`,
      false
    ); // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
      self.jsClientSdkInstance = jsClientSdk;
      console.log('==================', request.responseText)
      self.jsClientSdkInstance.init(JSON.parse(request.responseText));
    }

    // fetch(`${process.env.PUBLIC_URL}/explorer-settings.json`)
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (myJson) {
    //     config = myJson;
    //     self.jsClientSdkInstance = jsClientSdk;
    //     self.jsClientSdkInstance.init(config);
    //     // console.log(JSON.stringify(myJson));
    //   })
    //   .catch(e => {
    //     console.log('e', e);
    //   });
  }

  BlockInfoOptions() {
    return this.jsClientSdkInstance.BlockInfoOptions;
  }

  TransactionTypes() {
    return this.jsClientSdkInstance.TransactionType;
  }

  AllocationTypes() {
    return this.jsClientSdkInstance.AllocationTypes;
  }

  geChainStats = () => {
    return this.jsClientSdkInstance.getChainStats();
  };

  getRecentFinalized = () => {
    return this.jsClientSdkInstance.getRecentFinalized();
  };

  getLatestFinalized = () => {
    return this.jsClientSdkInstance.getLatestFinalized();
  };

  getBlockInfoByRound = (
    round,
    options = this.jsClientSdkInstance.BlockInfoOptions.HEADER
  ) => {
    return this.jsClientSdkInstance.getBlockInfoByRound(round, options);
  };

  getBlockInfoByHash = (
    hash,
    options = this.jsClientSdkInstance.BlockInfoOptions.HEADER
  ) => {
    return this.jsClientSdkInstance.getBlockInfoByHash(hash, options);
  };

  checkTransactionStatus = hash => {
    return this.jsClientSdkInstance.checkTransactionStatus(hash);
  };

  getBalance = clientId => {
    return this.jsClientSdkInstance.getBalance(clientId);
  };

  getAllBlobbers = () => {
    return this.jsClientSdkInstance.getAllBlobbers();
    // let response = {
    //   Nodes: [
    //     {
    //       id: '7680ECBF2ABC4B7C17CFC87967F113EC5DC77F51',
    //       url: 'http://pedro.alphanet-0chain.net:5051'
    //     },
    //     {
    //       id: "6780ECBF2ABC4B7C17CFC87967F113EC5DC77F52'",
    //       url: 'http://pedro.alphanet-0chain.net:5052'
    //     },
    //     {
    //       id: '6780ECBF2ABC4B7C17CFC87967F113EC5DC77F53',
    //       url: 'http://pedro.alphanet-0chain.net:5053'
    //     },
    //     {
    //       id: '6780ECBF2ABC4B7C17CFC87967F113EC5DC77F54',
    //       url: 'http://tito.alphanet-0chain.net:5054'
    //     },
    //     {
    //       id: '6780ECBF2ABC4B7C17CFC87967F113EC5DC77F55',
    //       url: 'http://tito.alphanet-0chain.net:5055'
    //     },
    //     {
    //       id: '6780ECBF2ABC4B7C17CFC87967F113EC5DC77F56',
    //       url: 'http://tito.alphanet-0chain.net:5056'
    //     }
    //   ]
    // };
    // return new Promise(function(resolve, reject) {
    //   setTimeout(function() {
    //     resolve(response);
    //   }, 300);
    // });
  };

  fetchBlobberStats = url => {
    return fetch(`${url}/getstats`);
  };

  getAllValidators = () => {
    let response = [
      {
        address: '7680ECBF2ABC4B7C17CFC87967F113EC5DC77F54',
        noOfResponses: 235235245,
        reward: 1000000000000
      },
      {
        address: '6780ECBF2ABC4B7C17CFC87967F113EC5DC77F54',
        noOfResponses: 454326523463,
        reward: 3000000000000
      }
    ];
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(response);
      }, 300);
    });
  };

  //wallet api'S

  registerClient = () => {
    return this.jsClientSdkInstance.registerClient();
  };

  restoreWallet = mnemonic => {
    return this.jsClientSdkInstance.restoreWallet(mnemonic);
  };

  sendTransaction = (ae, toClientId, val, note) => {
    return this.jsClientSdkInstance.sendTransaction(ae, toClientId, val, note);
  };

  storeData = (ae, note) => {
    return this.jsClientSdkInstance.storeData(ae, note);
  };

  getZCNTestToken = ae => {
    return this.jsClientSdkInstance.executeFaucetSmartContract(
      ae,
      'pour',
      {},
      1 * Math.pow(10, 10)
    );
  };

  getCurrentUSDPrice = () => {
    return fetch('https://api.coinmarketcap.com/v2/ticker/2882/');
  };

  hexStringToByte = str => {
    return this.jsClientSdkInstance.utils.hexStringToByte(str);
  };
}

// To mimic singleton behaviour
export default new RestApiManager();
