const connection = require('../app/database')

class CommentService {
  async createComment(momentId, content, id) {
    const statement = `INSERT INTO  comment (content, user_id, moment_id) VALUES (?,?,?)`
    const [result] = await connection.execute(statement, [content, id, momentId])
    return result
  }

  async reply(momentId, content, commentId, id) {
    const statement = `INSERT INTO  comment (content, user_id, moment_id, comment_id) VALUES (?,?,?,?)`
    try {
      const [result] = await connection.execute(statement, [content, id, momentId, commentId])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async updateComment(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [content, commentId])
    return result
  }

  async delComment(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?`
    try {
      const [result] = await connection.execute(statement, [commentId])
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new CommentService()
