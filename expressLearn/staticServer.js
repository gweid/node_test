const express = require('express')

const app = express()

app.use(express.static('./statics'))

app.listen(9000, () => {
  console.log('静态资源服务器已开启: 0.0.0.0:9000')
})