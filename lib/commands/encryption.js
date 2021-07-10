const inquirer = require('inquirer')
const { AES_encrypt } = require('../utils/aes.crypto')
const { checkDeployConfigExists } = require('../utils')
const { deployConfigPath } = require('../config')
module.exports = {
  description: '加密',
  apply: async () => {
    if (checkDeployConfigExists()) {
      const { content } = await inquirer.prompt([
        {
          type: 'input',
          name: 'content',
          message: '需要加密的字符'
        }
      ])
      const { cryptoKey, cryptoIv } = require(deployConfigPath)
      return AES_encrypt(content, cryptoKey, cryptoIv)
    }
  }
}
