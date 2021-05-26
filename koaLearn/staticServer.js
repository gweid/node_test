const Koa = require('koa')
const koaStatic = require('koa-static')

const app = new Koa()

// ./statics 为对应的静态资源目录
app.use(koaStatic('./statics'))

app.listen(9000, () => {
  console.log('服务器已启动: 0.0.0.0:9000')
})