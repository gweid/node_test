const express = require('express')

const userRouter = require('./routers/users')

const app = express()

app.use('/', userRouter)

app.listen(9000, () => {
  console.log('服务器已开启: 0.0.0.0:9000')
})