const express = require('express')

const app = express()

// res.end 方式，只能返回 string、buffer 类型
// app.post('/login', (req, res) => {
//   res.end('success')
// })


// res.json 返回 json 格式数据
// app.post('/login', (req, res) => {
//   res.json({
//     code: 0,
//     message: 'ok'
//   })
// })


// res.send 返回可以是：buffer、字符串、对象、布尔值或数组
// app.post('/login', (req, res) => {
//   res.send({
//     code: 0,
//     message: 'ok'
//   })
// })

// res.status：设置响应状态码
// app.post('/login', (req, res) => {
//   res.status(200)
//   res.send({
//     code: 0,
//     message: 'ok'
//   })
// })


// res.set 设置响应头
app.post('/login', (req, res) => {
  res.set({
    'content-type': 'application/json'
  })
  res.send({
    code: 0,
    message: 'ok'
  })
})

app.listen(9000, () => {
  console.log('服务器已开启: 0.0.0.0:9000')
})