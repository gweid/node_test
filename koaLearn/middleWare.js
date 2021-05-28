const Koa = require('koa')

const userRouter = require('./routers/users')

const app = new Koa()

// ---------------------------- 中间件
// const getInfoMiddle = (ctx, next) => {
//   const { method: reqMethod, path: reqPath } = ctx.request

//   if (reqMethod === 'GET' && reqPath === '/info') {
//     ctx.response.body = 'hello, koa'
//   }
// }

// app.use(getInfoMiddle)

// ---------------------------- 多个中间件
// 返回的结果是 hihihiih，这里与 express 略有不同
// const middleWare = (ctx, next) => {
//   console.log('开始中间件--1')
//   ctx.response.body = 'hello, koa'
//   next()
//   console.log('结束中间件--1')
// }

// const middleWare1 = (ctx, next) => {
//   console.log('开始中间件--2')
//   ctx.response.body = 'hihihiih'
//   console.log('结束中间件--2')
// }

// app.use(middleWare)
// app.use(middleWare1)


//------------------------------ 使用第三方中间件 koa-router
// userRouter.routes() 会返回一个中间件函数
app.use(userRouter.routes())
// 可以为没有实现的方法自动报错，例如现在只实现了 get、post 请求
// 如果发起的 put 请求，那么会报错：Method Not Allowed，并且返回 405 状态码
app.use(userRouter.allowedMethods())

app.listen(9000, () => {
  console.log('服务器已启动: 0.0.0.0:9000')
})
