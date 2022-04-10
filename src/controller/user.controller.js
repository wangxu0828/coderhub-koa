// 用户请求接口具体逻辑
const { create } = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const { name, password } = ctx.request.body
    // 查询数据
    const result = await create({ name, password })
    // 返回数据
    ctx.body = result
  }
}

module.exports = new UserController()
