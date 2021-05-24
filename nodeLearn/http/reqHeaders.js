const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.headers)

  req.on('data', chunk => {
    console.log(chunk.toString());
  })

  res.end('server success')
})

server.listen(9000, () => {
  console.log('服务已启动: 0.0.0.0:9000')
})