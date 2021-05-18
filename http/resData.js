const http = require('http')

const server = http.createServer((req, res) => {
  // 使用 write 输出结果
  // res.write('write')
  // res.end()

  res.end('server success')
})

server.listen(9000, () => {
  console.log('服务已启动: 0.0.0.0:9000')
})