;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.Vue = factory()))
})(this, function () {
  'use strict'
  const { log } = require('./utils')
  const deploy = require('./commands/deploy')
  const init = require('./commands/init')
  const encryption = require('./commands/encryption')

  const doDeploy = async (env, options) => {
    log(deploy.description)
    return await deploy.apply(env, options)
  }
  const doInit = () => {
    log(init.description)
    return init.apply()
  }
  const doEncryption = async () => {
    log(encryption.description)
    log(await encryption.apply())
  }
  return {
    doDeploy,
    doInit,
    doEncryption
  }
})
