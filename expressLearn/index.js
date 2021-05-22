const express = require('express')

const app = express()

app.get('/info', (req, res, next) => {
  res.end('success')
})

app.post('/login', (req, res, next) => {
  res.end('success')
})

app.listen(9000, () => {
  console.log('服务器开启: 0.0.0.0:9000');
})