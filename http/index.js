const http = require('http')

// 端口号
const HTTP_PORT = 9000
// host 地址
const HTTP_HOST = '0.0.0.0'

// 创建一个服务器
const server = http.createServer((req, res) => {
  res.end('server success')
})

// 启动服务器，指定端口号和主机地址
server.listen(HTTP_PORT, HTTP_HOST, () => {
  console.log(`服务器已启动：${HTTP_HOST}:${HTTP_PORT}`)
})

// new http.Server 的方式创建服务器
const server2 = new http.Server((req, res) => {
  res.end('new http.Server')
})

server2.listen(9001, () => {
  console.log(`服务器已启动：0.0.0.0:9001`);
})