const connection = require('../app/database')

class MementService {
  async createMement(user, moment) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?,?)`
    const [result] = await connection.execute(statement, [moment, user.id])
    return result
  }

  async getMomentById(id) {
    const statement = `
    SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,JSON_OBJECT('id', u.id, 'name',u.name) user, JSON_ARRAYAGG(JSON_OBJECT('id', c.id,'content', c.content,'user', JSON_OBJECT('name',cu.name))) comments 
    FROM moment m 
    LEFT JOIN user u ON m.user_id = u.id
    LEFT JOIN comment c ON m.id = c.moment_id 
    LEFT JOIN user cu ON c.user_id = cu.id  
    WHERE m.id =?
    `
    const [result] = await connection.execute(statement, [id])
    return result
  }

  async getMomentList(offset, size) {
    const statement = `SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,JSON_OBJECT('id', u.id, 'name',u.name) user, (SELECT COUNT(*) FROM comment WHERE m.id = comment.moment_id) commentCount
    FROM moment m 
    LEFT JOIN user u ON m.user_id = u.id 
    LIMIT 0,10;`
    const [result] = await connection.execute(statement, [offset + '', size + ''])

    return result
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
}

module.exports = new MementService()
