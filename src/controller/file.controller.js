const service = require('../service/file.service')
const fs = require('fs')
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path')
class FileCOntroller {
  async saveAvatarInfo(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file
    const { id } = ctx.user
    const result = await service.saveAvatarInfo(filename, mimetype, size, id)
    ctx.body = result
  }

  async getAvatarByFileName(ctx, next) {
    const { filename } = ctx.params
    try {
      const result = await service.getAvatarFileName(filename)
      ctx.response.set('content-type', result.mimetype)
      ctx.body = fs.createReadStream(AVATAR_PATH + '/' + result.filename)
    } catch (error) {
      console.log(error)
    }
  }

  async savePictureInfo(ctx, next) {
    const { files } = ctx.req
    const { momentId } = ctx.query
    const { id } = ctx.user
    for (const file of files) {
      const { filename, mimetype, size } = file
      const res = await service.savePictureInfo(filename, mimetype, size, id, momentId)
    }
    ctx.body = '添加成功'
  }

  async getPictureByFileName(ctx, next) {
    const { filename } = ctx.params
    const { type } = ctx.query
    const { mimetype } = await service.getPictureFileName(filename)
    ctx.response.set('content-type', mimetype)
    console.log(`${PICTURE_PATH}/${filename}-${type}`)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}-${type}`)
  }
}

module.exports = new FileCOntroller()
