class Transaction {
  constructor (amount, senderPublicKey, receiverPublicKey) {
    this.amount = amount
    this.senderPublicKey = senderPublicKey
    this.receiverPublicKey = receiverPublicKey
  }

  // Convert the data of the class to JSON so that
  // it can be converted into a hash
  toString () {
    return JSON.stringify(this)
  }
}

module.exports = Transaction
