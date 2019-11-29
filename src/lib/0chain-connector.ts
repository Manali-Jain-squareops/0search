import jsClientSdk from 'js-client';

export default class Connector {
  constructor(config) {
    jsClientSdk.init(config);
  }

  async getBlockNumInChain(): Promise<number> {
    const blockData = await jsClientSdk.getLatestFinalized();
    return blockData.round;
  }

  async getBlockDataByRound(round: number): Promise<object> {
    const blockSummary = await jsClientSdk.getBlockInfoByRound(round, jsClientSdk.BlockInfoOptions.FULL);
    blockSummary.chain_stats = await this.getChainStats();
    return blockSummary;
  }

  async getTransactionDetails(txnHash: string): Promise<object> {
    const transactionDetails = await jsClientSdk.checkTransactionStatus(txnHash);
    return transactionDetails;
  }

  async getChainStats(): Promise<object> {
    return await jsClientSdk.getChainStats();
  }

  // TODO: This is a dummy function to verify the transaction payload by hitting the blockchain and comparing the recived file. As of now I am unable to do this via the SDK
  async verifyFile(fileData): Promise<boolean> {
    const blobbers = await jsClientSdk.getAllBlobbers();
    // This is the right function I assumed. It may vary depending on what is the right approach.
    const file = await jsClientSdk.getAllocationFilesFromPath(fileData.allocationId, blobbers, fileData.path_hash);
    // Verify input parameters with received files and return status. Below is a dummy
    return !!file;
  }
}
