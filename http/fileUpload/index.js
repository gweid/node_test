// ------------- 文件上传

const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  if (req.url === '/upload' && req.method === 'POST') {
    let data = ''
    req.on('data', chunk => {
      // 不能直接通过 writeStream 写入 chunk，因为上传上来的除了图片本身，还有很多信息，例如 图片名 等
      // 直接 writeStream 写入，图片肯定打不开

      data += chunk
    })

    req.on('end', () => {
      console.log(data)
      res.end('文件上传成功')
    })
  }
})

server.listen(9000, () => {
  console.log('服务器启动: 0.0.0.0:9000');
})