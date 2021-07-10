const { exec, spawn } = require('child_process')
const { log } = require('../utils')

const execute = (cmd, options) => {
  return new Promise((resolve, reject) => {
    exec(cmd, options, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        log(stdout.toString())
        log(stderr.toString())
        resolve('success')
      }
    })
  })
}

const spawnExecute = (cmd, args, options) => {
  const isWin32 = process.platform === 'win32'
  return new Promise((resolve, reject) => {
    const script = spawn(isWin32 ? `${cmd}.cmd` : cmd, args, options)
    script.stdout.on('data', (data) => {
      log(data.toString())
    })

    script.stderr.on('data', (data) => {
      console.error(data.toString())
      reject(data.toString())
    })

    script.on('close', (code) => {
      log(`子进程退出，退出码 ${code}`)
      resolve(code.toString())
    })
  })
}
module.exports = {
  execute,
  spawnExecute
}
