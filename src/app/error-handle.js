const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_ALREADY_EXIST, NAME_IS_NOT_EXIST, PASSWORD_IS_INCURRENT, TOKEN_ERROR, MOMENT_COTENT_IS_NOT_EXIST, UNPERMISSION } = require('../constants/error-types')

const errorHandler = (err, ctx) => {
  let massage
  let code
  switch (err.message) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      massage = '账号和密码不能为空'
      code = 400
      break
    case NAME_ALREADY_EXIST:
      massage = '账号已存在'
      code = 409 // conflict
      break
    case NAME_IS_NOT_EXIST:
      massage = '账号不存在'
      code = 400
      break
    case PASSWORD_IS_INCURRENT:
      massage = '密码错误'
      code = 400
      break
    case TOKEN_ERROR:
      massage = 'token错误'
      code = 401
      break
    case UNPERMISSION:
      massage = '你没有操作的权限'
      code = 401
      break
    case MOMENT_COTENT_IS_NOT_EXIST:
      massage = '动态内容不能为空'
      code = 400
      break
    default:
      massage = '找不到资源'
      code = 404
      break
  }
  ctx.body = massage
  ctx.status = code
}

module.exports = {
  errorHandler,
}
