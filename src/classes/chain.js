const crypto = require('crypto')
const Block = require('./block')
const Transaction = require('./transaction')

// Holds every block and transaction that takes place on the blockchain
// Needs to be initialized only ONCE
class Chain {
  constructor () {
    // The first (Genesis) block with no records
    this.chain = [new Block('', new Transaction(100, 'temp', 'temp'))]
  }

  // Get the last hash of the chain
  // Send the entire block itself
  getPreviousBlockHash () {
    return this.chain[this.chain.length - 1].getHash()
  }

  // Create and insert a block into the chain array
  insertBlock (transaction, senderPublicKey, sig) {
    // Create the verifier
    const verify = crypto.createVerify('SHA256')

    // Add the transaction JSON
    verify.update(transaction.toString())

    // Verify using the sender's public key
    const isValid = verify.verify(senderPublicKey, sig)

    if (isValid) {
      const block = new Block(this.getPreviousBlockHash(), transaction)
      console.log('Block added', block.toString())
      this.chain.push(block)
    }
  }
}

Chain.instance = new Chain()
module.exports = Chain
