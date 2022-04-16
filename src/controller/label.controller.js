const service = require('../service/label.service')

class LabelController {
  async create(ctx, next) {
    const { content } = ctx.request.body
    const result = await service.create(content)
    ctx.body = result
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query
    console.log(offset, size)
    const result = await service.list(offset, size)
    ctx.body = result
  }
}

module.exports = new LabelController()
