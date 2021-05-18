const http = require('http')

// 创建一个服务器
const server = http.createServer((req, res) => {
  res.end('server success')
})

// 启动服务器，指定端口号和主机地址
server.listen(() => {
  const HTTP_PORT = server.address().port
  console.log(`服务器已启动：0.0.0.0:${HTTP_PORT}`)
})