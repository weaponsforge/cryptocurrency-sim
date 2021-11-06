const crypto = require('crypto')
const Transaction = require('./transaction')
const Chain = require('./chain')

// Used to send cryptocurrencies to other users
class Wallet {
  constructor () {
    const keys = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    })

    // private key: used to create new transactions
    this.privateKey = keys.privateKey

    // public key: used to verify transactions and receive cryptocurrencies
    this.publicKey = keys.publicKey
  }

  send (amount, receiverPublicKey) {
    const transaction = new Transaction(
      amount,
      this.publicKey,
      receiverPublicKey
    )

    // Add the transaction JSON
    const shaSign = crypto.createSign('SHA256')
    shaSign.update(transaction.toString()).end()

    // Sign the SHA with this wallet's private key
    const signature = shaSign.sign(this.privateKey)

    try {
      Chain.instance.insertBlock(transaction, this.publicKey, signature)
    } catch (err) {
      console.log(err.message)
    }
  }
}

module.exports = Wallet
