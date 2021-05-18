const http = require('http')
const url = require('url')
const querystring = require('querystring')
const qs = require('qs')

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url)
  const queryObj = qs.parse(query)

  if (pathname === '/login') {
    res.end('login successs')
  } else if (['/', '/home'].includes(pathname)) {
    res.end('homePage')
  } else {
    res.end('404 not found')
  }
})

server.listen(9000, () => {
  console.log('服务已启动: 0.0.0.0:9000')
})