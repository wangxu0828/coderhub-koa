// 所有对app的操作在这里做就行了
const Koa = require('koa')
/* 用户请求接口 */
// 用户注册路由
const userRouter = require('../router/user.router')
// 用户登陆路由
const authRouter = require('../router/auth.router')

const BodyParser = require('koa-bodyparser')

const { errorHandler } = require('./error-handle')

const useRouter = require('../router/index')
const app = new Koa()

app.use(BodyParser())
useRouter(app)

app.on('error', errorHandler)

module.exports = app
