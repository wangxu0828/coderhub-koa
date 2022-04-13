// 登陆接口数据验证中间件
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_NOT_EXIST, PASSWORD_IS_INCURRENT, TOKEN_ERROR, UNPERMISSION } = require('../constants/error-types')
const { PUBLIC_KEY } = require('../app/config')
// 用户账号是否存在和用户账号是否重复逻辑一样
const { checkNameExist } = require('../service/user.service')
const md5Password = require('../untils/handle-password')
const { checkPermission } = require('../service/auth.service')
const jwt = require('jsonwebtoken')
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

  ctx.user = user

  await next()
}

// 验证用户是否登陆
const verifyAuth = async (ctx, next) => {
  const token = ctx.header?.authorization?.replace('Bearer ', '')
  if (token) {
    try {
      const result = jwt.verify(token, PUBLIC_KEY, {
        algorithms: ['RS256'],
      })
      ctx.user = {
        id: result.id,
        name: result.name,
      }
      await next()
    } catch (error) {
      console.log(error)
      const err = new Error(TOKEN_ERROR)
      ctx.app.emit('error', err, ctx)
    }
  } else {
    const err = new Error(TOKEN_ERROR)
    ctx.app.emit('error', err, ctx)
  }
}

const verifyPermission = (tableName) => {
  return async (ctx, next) => {
    const { id } = ctx.user
    const tableId = ctx.params[`${tableName}Id`]
    // 查询是否具备权限
    const res = await checkPermission(tableId, id, tableName)
    if (res) {
      await next()
    } else {
      const error = new Error(UNPERMISSION)
      ctx.app.emit('error', error, ctx)
    }
  }
}

module.exports = {
  checkLogin,
  verifyAuth,
  verifyPermission,
}
