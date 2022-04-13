const connection = require('../app/database')

class AuthService {
  // 判断权限
  async checkPermission(tableId, id, tableName) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? and user_id = ?`
    console.log(tableId, id)
    const [result] = await connection.execute(statement, [tableId, id])
    if (result.length === 0) {
      return false
    } else {
      return true
    }
  }
}

module.exports = new AuthService()
