const {cryptoKey, cryptoIv} = require('./.key')
module.exports = {
  projectName: 'robot-deploy',
  privateKey: '',
  passphrase: '',
  cryptoKey,
  cryptoIv,
  cluster: [],
  dev: {
    name: '开发环境',
    script: 'npm run build',
    host: '192.168.119.192',
    port: 22,
    username: '0A2BE6D52CAFCA681142A4A5019EA1F7',
    password: 'C41A14EB8C43CEA0710FCCC876188F47',
    distPath: 'dist',
    webDir: '/www/test/test',
    bakDir: '',
    isRemoveRemoteFile: true,
    isRemoveLocalFile: true
  }
}
