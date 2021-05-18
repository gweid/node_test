const http = require('http')

const server = http.createServer((req, res) => {
  // res.setHeader('content-type', 'application/json;charset=utf8')

  res.writeHead(200, {
    'content-type': 'application/json;charset=utf8'
  })
  res.end('<div>hello, http</div>')
})

server.listen(9000, () => {
  console.log('服务已启动: 0.0.0.0:9000')
})