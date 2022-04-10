// 用户请求接口路由注册相关, 具体逻辑不会放在这里
const Router = require('koa-router')
const { create } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/', verifyUser, handlePassword, create)

module.exports = userRouter
