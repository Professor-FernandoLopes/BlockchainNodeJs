
const SHA256 = require('crypto-js/sha256');


class Block {
    constructor(timestamp, lastHash, hash, data) {
      this.timestamp = timestamp;
      this.lastHash = lastHash;
      this.hash = hash;
      this.data = data;
    }
    toString() {
        return `Block -
              Timestamp : ${this.timestamp}
              Last Hash : ${this.lastHash.substring(0, 10)}
              Hash      : ${this.hash.substring(0, 10)}
              Data      : ${this.data}`;
      }
      static genesis() {
        return new this('Genesis time', '-----', 'f1r57-h45h', []);
    }
   
    // cria um novo bloco a partir do bloco anterior
    
    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);
        return new this(timestamp, lastHash, hash, data);
    }
    
    // recebe os dados do bloco.
    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    // recebe o bloco, pega os dados do bloco, e aplica a função hash nesses dados.  
    static blockHash(block) {
    const { timestamp, lastHash, data } = block;
        return Block.hash(timestamp, lastHash, data);
    }

    }

    
    module.exports = Block;