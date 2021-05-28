const Koa = require('koa')

const app = new Koa()

const middleWare = (ctx, next) => {
  ctx.response.body = 'hello, koa'
  next()
}

const middleWare1 = (ctx, next) => {
  ctx.response.body = 'hihihiih'
}


app.use(middleWare)
app.use(middleWare1)

app.listen(9000, () => {
  console.log('服务器已启动: 0.0.0.0:9000')
})
