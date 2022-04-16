const service = require('../service/comment.service')
class CommentController {
  async createComment(ctx, next) {
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user
    console.log(momentId, content, id)
    const result = await service.createComment(momentId, content, id)
    ctx.body = result
  }

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body
    const { commentId } = ctx.params
    const { id } = ctx.user
    try {
      const result = await service.reply(momentId, content, commentId, id)
      ctx.body = result
    } catch (error) {
      console.log(error)
    }
  }

  async updateComment(ctx, next) {
    const commentId = ctx.params.commentId
    const { content } = ctx.request.body

    const result = await service.updateComment(commentId, content)
    ctx.body = result
  }

  async delComment(ctx, next) {
    const commentId = ctx.params.commentId
    const result = await service.delComment(commentId)
    ctx.body = result
  }
}

module.exports = new CommentController()
