const connection = require('../app/database')
class FileService {
  async saveAvatarInfo(filename, mimetype, size, id) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [filename, mimetype, size, id])
    return result
  }

  async getAvatarFileName(filename) {
    const statement = `SELECT * FROM avatar WHERE filename = ?`
    const [result] = await connection.execute(statement, [filename])
    return result[0]
  }

  async savePictureInfo(filename, mimetype, size, id, momentId) {
    const statement = `INSERT INTO file (filename, mimetype, size, user_id,moment_id) VALUES (?, ?, ?, ?,?);`
    const [result] = await connection.execute(statement, [filename, mimetype, size, id, momentId])
    return result
  }
  async getPictureFileName(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?`
    const [result] = await connection.execute(statement, [filename])
    return result[0]
  }
}

module.exports = new FileService()
