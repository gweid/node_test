const http = require('http')

// 发起 get 请求
// http.get('http://localhost:9000', res => {
//   res.on('data', chunk => {
//     console.log(chunk.toString())
//   })
// })

// 发起请求（注意，http 发起所有请求都可以通过 http.request）
const request = http.request({
  method: 'POST',
  hostname: 'localhost',
  port: 9000
}, res => {
  res.on('data', chunk => {
    console.log(chunk.toString())
  })
})

// 必须要 end，代表请求相关配置已准备好，可以发送请求
request.end()