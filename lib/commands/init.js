const fs = require('fs')
const childProcess = require('child_process')
const inquirer = require('inquirer')
const {
  checkDeployConfigExists,
  succeed,
  error,
  underline,
  info
} = require('../utils')
const { AES_encrypt } = require('../utils/aes.crypto')
const createUid = require('../utils/create.uid')
const { inquirerConfig, deployConfigPath } = require('../config')

// 获取用户输入信息
const getUserInputInfo = () => {
  return inquirer.prompt(inquirerConfig)
}

// 创建JSON对象
const createJsonObj = (userInputInfo) => {
  const cryptoKey = createUid()
  const cryptoIv = createUid()
  const jsonObj = {
    projectName: userInputInfo.projectName,
    privateKey: userInputInfo.privateKey,
    passphrase: userInputInfo.passphrase,
    cryptoKey,
    cryptoIv,
    cluster: []
  }
  const { deployEnvList } = userInputInfo

  const createObj = (env) => {
    return {
      name: userInputInfo[`${env}Name`],
      script: userInputInfo[`${env}Script`],
      host: userInputInfo[`${env}Host`],
      port: userInputInfo[`${env}Port`],
      username: AES_encrypt(
        userInputInfo[`${env}Username`],
        cryptoKey,
        cryptoIv
      ),
      password: AES_encrypt(
        userInputInfo[`${env}Password`],
        cryptoKey,
        cryptoIv
      ),
      distPath: userInputInfo[`${env}DistPath`],
      webDir: userInputInfo[`${env}WebDir`],
      bakDir: userInputInfo[`${env}BakDir`],
      isRemoveRemoteFile: userInputInfo[`${env}IsRemoveRemoteFile`],
      isRemoveLocalFile: userInputInfo[`${env}IsRemoveLocalFile`]
    }
  }

  deployEnvList.forEach((item) => (jsonObj[item] = createObj(item)))

  return jsonObj
}

// 创建配置文件
const createConfigFile = (jsonObj) => {
  const str = `module.exports = ${JSON.stringify(jsonObj, null, 2)}`
  fs.writeFileSync(deployConfigPath, str)
}

// 格式化配置文件
const formatConfigFile = () => {
  childProcess.execSync(`npx prettier --write ${deployConfigPath}`)
}

module.exports = {
  description: '初始化项目',
  apply: () => {
    if (checkDeployConfigExists()) {
      error('deploy.config.js 配置文件已存在')
      process.exit(1)
    } else {
      getUserInputInfo().then((userInputInfo) => {
        createConfigFile(createJsonObj(userInputInfo))
        formatConfigFile()
        info(`请将配置文件中的 cryptoKey cryptoIv 俩个字段的值单独文件存放，并且不要上传到git，以确保服务器密码不被泄露`)
        succeed(
          `配置文件生成成功，请查看项目目录下的 ${underline(
            'deploy.config.js'
          )} 文件确认配置是否正确`
        )
        process.exit(0)
      })
    }
  }
}
