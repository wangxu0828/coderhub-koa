const connection = require('../app/database')
const { APP_PORT, APP_HOST } = require('../app/config')
class MementService {
  async createMement(user, moment) {
    console.log(user, moment)
    const statement = `INSERT INTO moment (content, user_id) VALUES (?,?)`
    try {
      const [result] = await connection.execute(statement, [moment, user.id])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async getMomentById(id) {
    const url = `"${APP_HOST}:${APP_PORT}/avatar/"`
    const statement = `
    SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name',u.name, "avatar", CONCAT(${url}, a.filename)) user, 
    IF(COUNT(c.id), JSON_ARRAYAGG(JSON_OBJECT('id', c.id,'content', c.content,'user', JSON_OBJECT('name',cu.name))), null) comments,
    IF(COUNT(l.id), JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)), null) labels,
    (SELECT JSON_ARRAYAGG(CONCAT(${url}, f.filename)) from file f WHERE f.moment_id = m.id) images
    FROM moment m
    LEFT JOIN user u ON m.user_id = u.id
    LEFT JOIN comment c ON m.id = c.moment_id 
    LEFT JOIN user cu ON c.user_id = cu.id
    LEFT JOIN avatar a ON a.user_id = u.id
		LEFT JOIN moment_label ml ON ml.moment_id = m.id
		LEFT JOIN label l ON ml.label_id = l.id
    WHERE m.id =?;
    `
    try {
      const [result] = await connection.execute(statement, [id])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async getMomentList(offset, size) {
    const url = `"${APP_HOST}:${APP_PORT}/avatar/"`
    const statement = `SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,JSON_OBJECT('id', u.id, 'name',u.name, "avatar", CONCAT(${url}, a.filename)) user, (SELECT COUNT(*) FROM comment WHERE m.id = comment.moment_id) commentCount,
    (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
    (SELECT JSON_ARRAYAGG(CONCAT(${url}, f.filename)) from file f WHERE f.moment_id = m.id) images
    FROM moment m 
    LEFT JOIN user u ON m.user_id = u.id
    LEFT JOIN avatar a ON a.user_id = u.id
    LIMIT ?,?;`
    try {
      const [result] = await connection.execute(statement, [offset + '', size + ''])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async updateMomentById(momentId, content, start, end) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [content, momentId])
    return result
  }

  async deleteMomentById(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }

  async addLabel(moment_id, label_id) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`
    const [result] = await connection.execute(statement, [moment_id, label_id])
    return result
  }

  async hasLabelToMonent(moment_id, label_id) {
    const statement = `SELECT * FROM moment_label Where moment_id = ? and label_id = ?;`
    const [result] = await connection.execute(statement, [moment_id, label_id])
    return result[0] ? true : false
  }
}

module.exports = new MementService()
