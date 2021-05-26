const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  ctx.status = 200
  ctx.set({
    'Cache-Control': 'no-cache'
  })
  ctx.body = {
    code: 0,
    message: 'success'
  }
})

app.listen(9000, () => {
  console.log('服务器已启动: 0.0.0.0:9000')
})