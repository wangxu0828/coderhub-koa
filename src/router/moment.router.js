// 发表动态路由
const Router = require('koa-router')
const { verifyPermission } = require('../middleware/auth.middleware')

const momentRouter = new Router({ prefix: '/moment' })

const { verifyAuth } = require('../middleware/auth.middleware')
const { create, getMomentById, getMomentList, updateMomentById, deleteMomentById, addLabels } = require('../controller/moment.controller')

const { isLabelExist } = require('../middleware/label.middleware')

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/:momentId', getMomentById)
momentRouter.get('/', getMomentList)

momentRouter.patch('/:momentId', verifyAuth, verifyPermission('moment'), updateMomentById)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission('moment'), deleteMomentById)

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission('moment'), isLabelExist, addLabels)

module.exports = momentRouter
