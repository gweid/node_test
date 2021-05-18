const http = require('http')

const server = http.createServer((req, res) => {
  const { method: reqMethod, url: reqUrl } = req

  if (reqUrl === '/login' && reqMethod === 'POST') {
    let data = ''
    
    req.on('data', chunk => {
      data += chunk
    })

    req.on('end', () => {
      const body = JSON.parse(data.toString())
      console.log(body)

      res.end('server success')
    })
  }
})

server.listen(9000, () => {
  console.log('服务已启动: 0.0.0.0:9000')
})