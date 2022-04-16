const service = require('../service/label.service')
const isLabelExist = async (ctx, next) => {
  const { labels } = ctx.request.body
  const newLabels = []
  for (const label of labels) {
    const result = await service.isLabelExist(label)
    if (!result) {
      const result = await service.create(label)
      newLabels.push({
        id: result.insertId,
        name: label,
      })
    } else {
      newLabels.push({
        id: result.id,
        name: label,
      })
    }
  }
  ctx.labels = newLabels
  await next()
}

module.exports = {
  isLabelExist,
}
