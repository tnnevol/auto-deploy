const CryptoJS = require('crypto-js')
module.exports = {
  /**
   * @description 加密
   * @param message 原文
   * @param key
   * @param iv
   * @returns {string}
   * @constructor
   */
  AES_encrypt(message, key, iv) {
    const srcs = CryptoJS.enc.Utf8.parse(message)
    const encrypted = CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString().toUpperCase()
  },
  /**
   * @description 解密
   * @param encrypted 密文
   * @param key
   * @param iv
   * @returns {string}
   * @constructor
   */
  AES_decrypted(encrypted, key, iv) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(encrypted)
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const decrypt = CryptoJS.AES.decrypt(srcs, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  }
}
