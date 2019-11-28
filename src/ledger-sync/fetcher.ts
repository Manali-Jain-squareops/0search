import Block from '../entities/block.entity';
import of from "await-of"
import sleep from "sleep"
import Connector from "./connector";
import { blockService } from "./services";

export default class Fetcher {
  private connector: Connector

  constructor(connector) {
    this.connector = connector
  }

  async start() {
    let latestBlockInChain = await this.connector.getBlockNumInChain()
    let latestBlockInDb = await this.getLatestBlockNumInDb()

    while (latestBlockInDb <= latestBlockInChain) {
      if (latestBlockInDb === latestBlockInChain) {
        sleep.msleep(200)
      } else {
        const [data, err] = await of(this.connector.getBlockDataByRound(latestBlockInDb + 1))
        if (err) {
          console.log("Error fetching data from blockchain", err)
          throw new Error("Error fetching data from blockchain")
        }
        // Update in database
        // await mongoose.connection.db.collection('blocks').insert(data)
        await blockService.add(data)

        latestBlockInDb = await this.getLatestBlockNumInDb()
        console.log("==============> Added round: ", latestBlockInDb)
      }
      latestBlockInChain = await this.connector.getBlockNumInChain()
    }
  }

  async getLatestBlockNumInDb(): Promise<number> {
    const [block, err] = await of(Block.findOne().sort("-round"))

    if (err) {
      console.log("Error fetching block from database", err)
      throw new Error("Error fetching block from database")
    }

    const currentBlockInDb = block && block.round != undefined ? block.round : 1
    return currentBlockInDb
  }
}
