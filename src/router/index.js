const fs = require('fs')
const useRouter = (app) => {
  const dirs = fs.readdirSync(__dirname)
  dirs.forEach((item) => {
    if (item === 'index.js') {
      return
    }
    const file = require(`./${item}`)
    app.use(file.routes())
    app.use(file.allowedMethods())
  })
}

module.exports = useRouter
