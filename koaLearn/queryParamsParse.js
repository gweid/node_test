const Koa = require('koa')
const KoaRouter = require('koa-router')

const app = new Koa()

const userRouter = new KoaRouter({ prefix: '/api' })

userRouter.get('/info/:id', (ctx, next) => {
  console.log(ctx.query) // 解析 query
  console.log(ctx.params) // 解析 params

  ctx.body = {
    code: 0,
    message: 'success'
  }
})

app.use(userRouter.routes())

app.listen(9000, () => {
  console.log('服务器已启动: 0.0.0.0:9000')
})