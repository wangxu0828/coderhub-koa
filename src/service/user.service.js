// 操作数据库
const connection = require('../app/database')

class UserService {
  // 新增用户
  async create(user) {
    const { name, password } = user
    const statement = 'INSERT INTO user (name, password) VALUES (?, ?);'
    // 将user存入数据库中
    const result = await connection.execute(statement, [name, password])
    return result[0]
  }
  // 判断用户名是否重复
  async checkNameExist(name) {
    const statement = 'SELECT * FROM user WHERE name = ?'
    const result = await connection.execute(statement, [name])
    return result[0]
  }
}

module.exports = new UserService()
