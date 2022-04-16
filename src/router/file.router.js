const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { avatarHandler, pictureHandler, pictureResize } = require('../middleware/file.middleware')
const { saveAvatarInfo, getAvatarByFileName, savePictureInfo, getPictureByFileName } = require('../controller/file.controller.js')

const fileRouter = new Router()

fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)
fileRouter.get('/avatar/:filename', getAvatarByFileName)
fileRouter.post('/picture', verifyAuth, pictureHandler, pictureResize, savePictureInfo)
fileRouter.get('/picture/:filename', getPictureByFileName)
module.exports = fileRouter
