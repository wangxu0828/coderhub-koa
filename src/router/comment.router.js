const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { createComment, reply, updateComment, delComment } = require('../controller/comment.controller')

const commentRouter = new Router({
  prefix: '/comment',
})

// 创建评论接口
commentRouter.post('/', verifyAuth, createComment)

// 回复评论接口
commentRouter.post('/:commentId/reply', verifyAuth, reply)

// 修改评论接口
commentRouter.patch('/:commentId', verifyAuth, verifyPermission('comment'), updateComment)

// 删除评论接口
commentRouter.delete('/:commentId', verifyAuth, verifyPermission('comment'), delComment)

module.exports = commentRouter
