const { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_ROOT, MYSQL_PASSWORD } = require('./config')

const Mysql = require('mysql2')

const connections = Mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_ROOT,
  password: MYSQL_PASSWORD,
})

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log('数据库连接失败')
    } else {
      console.log('数据库连接成功')
    }
  })
})

module.exports = connections.promise()
