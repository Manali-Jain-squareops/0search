import jsClientSdk from "js-client"

export default class Connector {
    constructor(config) {
        jsClientSdk.init(config)
    }

    async getBlockNumInChain():Promise<number> {
        const blockData = await jsClientSdk.getLatestFinalized()
        return blockData.round
    }

    async getBlockDataByRound(round: number):Promise<any> {
        // needed to be parsed according to data
        const blockSummary = await jsClientSdk.getBlockInfoByRound(round, jsClientSdk.BlockInfoOptions.FULL)
        return blockSummary
    }

    async getTransactionDetails(txnHash: string):Promise<any> {
        return await jsClientSdk.checkTransactionStatus(txnHash)
    }
}