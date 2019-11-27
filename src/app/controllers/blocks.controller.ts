import Responder from '../../lib/expressResponder'

class BlockController {
  static async recent (req, res) {
    Responder.success(res, 'Last 10 Recent Blocks History')
  }

  static async latest (req, res) {
    Responder.success(res, 'Latest Block')
  }

  static async list (req, res) {
    Responder.success(res, 'Block History')
  }

  static async get (req, res) {
    Responder.success(res, 'A Block!')
  }
}

export default BlockController
