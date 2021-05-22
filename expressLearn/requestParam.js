const express = require('express')

const app = express()

// 获取 query 参数：http://127.0.0.1:9000/info?id=20564
// app.get('/info', (req, res) => {
//   console.log(req.query)
//   res.end('success')
// })

// 获取 params 参数：http://127.0.0.1:9000/info/12354
app.get('/info/:id', (req, res) => {
  console.log(req.params)
  res.end('success')
})


app.listen(9000, () => {
  console.log('服务已启动: 0.0.0.0:9000')
})