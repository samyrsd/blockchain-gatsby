const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(data) {
    this.timestamp = new Date().toLocaleTimeString()
    this.hash = this.calculateHash()
    this.prevHash = "0"
    this.data = data
  }

  calculateHash() {
    return SHA256(this.timestamp + this.prevHash + this.data).toString()
  }

  toObject() {
    return {
      timestamp: this.timestamp,
      hash: this.hash,
      prevHash: this.prevHash,
      data: this.data
    }
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesis()]
  }

  addBlock(newBlock) {
    newBlock.prevHash = this.chain[this.chain.length - 1].hash
    newBlock.hash = newBlock.calculateHash()
    this.chain = this.chain.concat(newBlock)
  }

  createGenesis() {
    return new Block('GENESIS')
  }

  
}

module.exports = {
  Block,
  Blockchain,
}