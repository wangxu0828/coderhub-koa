// 发表动态接口具体逻辑
const { createMement, getMomentById, getMomentList, updateMomentById, deleteMomentById } = require('../service/moment.service')
const { MOMENT_COTENT_IS_NOT_EXIST } = require('../constants/error-types')
class MementController {
  // 发表动态
  async create(ctx, next) {
    // sql语句
    if (!ctx.request.body.moment) {
      const err = new Error(MOMENT_COTENT_IS_NOT_EXIST)
      ctx.app.emit('error', err, ctx)
    }
    const result = await createMement(ctx.user, ctx.request.body.moment)
    ctx.body = result
  }

  // 根据id获取文章
  async getMomentById(ctx, next) {
    const momentId = ctx.params.momentId
    const result = await getMomentById(momentId)
    ctx.body = result[0]
  }

  // 获取全部动态
  async getMomentList(ctx, next) {
    const { offset, size } = ctx.query
    const result = await getMomentList(offset, size)
    ctx.body = result
  }

  // 根据id来删除动态
  async updateMomentById(ctx, next) {
    // 1.获取参数
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    // 更改内容sql
    const result = await updateMomentById(momentId, content)
    ctx.body = result
  }

  async deleteMomentById(ctx, next) {
    // 1.获取参数
    const { momentId } = ctx.params
    const result = await deleteMomentById(momentId)
    ctx.body = result
  }
}

module.exports = new MementController()
