const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaBodyParse = require('koa-bodyparser')
const KoaMulter = require('koa-multer')
const path = require('path')

const app = new Koa()

const userRouter = new KoaRouter({ prefix: '/api' })

// --------------------------- 解析 json 和 x-www-form-urlencoded
// app.use(koaBodyParse())

// userRouter.post('/info', (ctx, next) => {
//   // 有 koa-bodyparse 中间件提供的功能
//   // 注意：这里不能简写 ctx.body，与 koa 原生提供的冲突
//   // 解析 json 和 x-www-form-urlencoded 都是使用的这个
//   console.log(ctx.request.body)

//   ctx.body = {
//     code: 0,
//     message: 'success'
//   }
// })


//--------------------------- 解析 form-data 数据格式
// 使用 koa-multer
// const storage = KoaMulter.diskStorage({
//   destination: './imgs/', // 存储的路径
//   // 保存的文件名
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = KoaMulter({
//   storage // 自定义配置
// })

// // upload.single 代表上传的是单张图片，图片是放在 键名为 file 上
// // 如果要上传多张，使用 upload.array('files')
// userRouter.post('/upload', upload.single('file'), (ctx, next) => {
//   // 拿到上传成功后信息，如果是多张，使用 ctx.req.files
//   console.log(ctx.req.file) // 图片
//   console.log(ctx.req.body) // 其他非图片

//   ctx.body = {
//     code: 0,
//     message: '上传成功'
//   }
// })

// 使用 koa-bodyparse
app.use(koaBodyParse({ }))
userRouter.post('/upload', (ctx, next) => {
  // 拿到上传成功后信息，如果是多张，使用 ctx.req.files
  console.log(ctx.req.file) // 图片
  console.log(ctx.req.body) // 其他非图片

  ctx.body = {
    code: 0,
    message: '上传成功'
  }
})

app.use(userRouter.routes())

app.listen(9000, () => {
  console.log('服务器已启动: 0.0.0.0:9000')
})