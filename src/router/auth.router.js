const Router = require('koa-router')

const { login } = require('../controller/auth.controller')
const { checkLogin } = require('../middleware/auth.middleware')

const authRouter = new Router({
  prefix: '/login',
})

authRouter.post('/', checkLogin, login)

module.exports = authRouter
