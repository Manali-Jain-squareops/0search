class TransactionController {
  static async list (req, res) {
    Responder.success(res, 'Transaction History')
  }

  static async get (req, res) {
    Responder.success(res, 'A Transaction!')
  }
}

export default TransactionController
