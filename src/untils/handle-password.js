const crypto = require('crypto')
const md5Password = (password) => {
  const md5 = crypto.createHash('md5')
  md5.update('' + password)
  const result = md5.digest('hex')
  return result
}

module.exports = md5Password
