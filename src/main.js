const app = require('./app')
const { APP_PORT } = require('./app/config')

app.listen(APP_PORT, () => {
  console.log(`服务器启动成功,端口号${APP_PORT}`)
})
