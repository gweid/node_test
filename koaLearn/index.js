const Koa = require('koa')

const app = new Koa()

const middleWare = (ctx, next) => {
  ctx.response.body = 'hello, koa'
}

app.use(middleWare)

app.listen(9000, () => {
  console.log('服务器已启动: 0.0.0.0:9000')
})
