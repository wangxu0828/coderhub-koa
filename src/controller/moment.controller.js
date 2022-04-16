// 发表动态接口具体逻辑
const { createMement, getMomentById, getMomentList, updateMomentById, deleteMomentById, addLabel, hasLabelToMonent } = require('../service/moment.service')
const { MOMENT_COTENT_IS_NOT_EXIST } = require('../constants/error-types')
class MementController {
  // 发表动态
  async create(ctx, next) {
    // sql语句
    if (!ctx.request.body.content) {
      const err = new Error(MOMENT_COTENT_IS_NOT_EXIST)
      ctx.app.emit('error', err, ctx)
    }
    const result = await createMement(ctx.user, ctx.request.body.content)
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

  async addLabels(ctx, next) {
    const labels = ctx.labels
    const { momentId } = ctx.params
    for (const label of labels) {
      // 判断标签是否和动态有关系
      const hasRelaxship = await hasLabelToMonent(momentId, label.id)
      if (!hasRelaxship) {
        await addLabel(momentId, label.id)
      }
    }

    ctx.body = '添加完毕'
  }
}

module.exports = new MementController()
