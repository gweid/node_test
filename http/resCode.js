const http = require('http')

const server = http.createServer((req, res) => {
  // res.writeHead(400)

  res.statusCode = 400
  res.end('server success')
})

server.listen(9000, () => {
  console.log('服务已启动: 0.0.0.0:9000')
})