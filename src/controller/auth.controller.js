// 权限请求接口具体逻辑
class AuthController {
  // 用户注册
  login(ctx, next) {
    ctx.body = `登陆成功,欢迎${ctx.request.body.name}回来`
  }
}

module.exports = new AuthController()
