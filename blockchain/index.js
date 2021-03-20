const Block = require('./block');

class Blockchain {
  constructor() {
  this.chain = [Block.genesis()];
  }

  addBlock(data) {
                                  // last block
    const block = Block.mineBlock(this.chain[this.chain.length-1], data);
    this.chain.push(block);
    return block;
  }

  isValidChain(chain) {
    // verifica se o primeiro bloco da blockchain é o bloco genesis
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
    
    for (let i=1; i<chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i-1];
      
      // verifica se o hash do bloco anterior está de acordo
      if (
        block.lastHash !== lastBlock.hash ||
        // verifica se o hash do bloco está de acordo.
        block.hash !== Block.blockHash(block)
      ) 
      
      {
        return false;
      }
    }
    return true;
  }
    
    // ainda que a blockchain seja válida, deve ser a maior existente na rede.
    replaceChain(newChain) {
    
      if (newChain.length <= this.chain.length) {
      console.log('Received chain is not longer than the current chain.');
      return;
    } 
      else if (!this.isValidChain(newChain)) {
      console.log('The received chain is not valid.');
      return;
    }
  
    console.log('Replacing blockchain with the new chain.');
    this.chain = newChain;
  }
}

module.exports = Blockchain;

