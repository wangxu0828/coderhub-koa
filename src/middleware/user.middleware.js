// 用户接口数据验证中间件
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_ALREADY_EXIST } = require('../constants/error-types')
const { checkNameExist } = require('../service/user.service')
const md5Password = require('../untils/handle-password')
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 验证用户输入的账号和密码是否为空
  if (!name || !password) {
    const err = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', err, ctx)
  }
  // 验证用户账号是否重复
  const result = await checkNameExist(name)
  if (result.length) {
    const err = new Error(NAME_ALREADY_EXIST)
    return ctx.app.emit('error', err, ctx)
  }

  await next()
}

// 给密码加密
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5Password(password)
  await next()
}
module.exports = {
  verifyUser,
  handlePassword,
}
