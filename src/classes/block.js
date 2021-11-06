const crypto = require('crypto')

// Transaction "container"
class Block {
  constructor (previousHash, transaction, timestamp = Date.now()) {
    // Hash of the previous block on the chain
    this.previousHash = previousHash

    this.transaction = transaction
    this.timestamp = timestamp
  }

  getHash () {
    // Convert this object to JSON format
    const json = JSON.stringify(this)

    // A hashing method
    const hash = crypto.createHash('SHA256')

    // Add the JSON as data to convert it to a SHA256 hash
    hash.update(json).end()

    // Create a HEX digest for the hash
    const hex = hash.digest('hex')
    return hex
  }

  // Convert the block object to JSON
  toString () {
    return JSON.stringify(this)
  }
}

module.exports = Block
