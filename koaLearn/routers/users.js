const KoaRouter = require('koa-router')

// prefix 是给所有的路由加上 /api 的前缀，
// 例如下面 /info，实际上接口路径是 /api/info
const userRouter = new KoaRouter({ prefix: '/api' })

userRouter.get('/info', (ctx, next) => {
  ctx.response.body = {
    code: 0,
    message: 'get success'
  }
})

userRouter.post('/info', (ctx, next) => {
  ctx.response.body = {
    code: 0,
    message: 'post success'
  }
})

module.exports = userRouter