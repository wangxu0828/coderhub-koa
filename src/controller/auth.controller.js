// 权限请求接口具体逻辑
const { PRIVATE_KEY, PUBLIC_KEY } = require('../app/config')
const jwt = require('jsonwebtoken')
class AuthController {
  // 用户注册
  login(ctx, next) {
    const { id, name } = ctx.user
    const token = jwt.sign(ctx.user, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256',
    })
    ctx.body = {
      id,
      name,
      token,
    }
  }
}

module.exports = new AuthController()
