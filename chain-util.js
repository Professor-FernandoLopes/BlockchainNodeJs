const SHA256 = require('crypto-js/sha256');


class ChainUtil {
  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }
}

module.exports = ChainUtil;