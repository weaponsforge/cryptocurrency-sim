const Wallet = require('./classes/wallet')
const Chain = require('./classes/chain')

// Create user wallets
const wizard = new Wallet()
const knight = new Wallet()
const elf = new Wallet()

// Send cryptocurrencies
wizard.send(50, knight.publicKey)
knight.send(23, elf.publicKey)
elf.send(5, knight.publicKey)

console.log(Chain.instance)
