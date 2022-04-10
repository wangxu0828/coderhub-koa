// 登陆接口数据验证中间件
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_NOT_EXIST, PASSWORD_IS_INCURRENT } = require('../constants/error-types')
// 用户账号是否存在和用户账号是否重复逻辑一样
const { checkNameExist } = require('../service/user.service')
const md5Password = require('../untils/handle-password')
const checkLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 判断用户账号和密码是否为空
  if (!name || !password) {
    const err = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', err, ctx)
  }
  // 判断用户账号是否存在
  const result = await checkNameExist(name)
  if (!result[0]) {
    const err = new Error(NAME_IS_NOT_EXIST)
    return ctx.app.emit('error', err, ctx)
  }
  // 数据库查找的是一个数组,
  // 这个数组在这里只有一项
  // 所以只需要这个数组的第一项就是用户本人
  const user = result[0]
  // 判断用户密码是否正确
  if (md5Password(password) !== user.password) {
    const err = new Error(PASSWORD_IS_INCURRENT)
    return ctx.app.emit('error', err, ctx)
  }

  await next()
}

module.exports = {
  checkLogin,
}
