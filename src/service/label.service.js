const connection = require('../app/database')

class LabelService {
  async create(content) {
    const statement = `INSERT INTO label (name) VALUES (?)`

    const [result] = await connection.execute(statement, [content])

    return result
  }

  async list(offset, size) {
    const statement = `SELECT * FROM label LIMIT ?, ?;`
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }

  async isLabelExist(label) {
    const statement = `SELECT * FROM label WHERE name = ?`
    const [result] = await connection.execute(statement, [label])
    return result[0]
  }
}

module.exports = new LabelService()
