const express = require('express')

const app = express()

//---------------------------------中间件
// 中间件1
const myMiddleFun1 = (req, res, next) => {
  console.log('中间件--1')
  next()
}

// 中间件2
const myMiddleFun2 = (req, res, next) => {
  console.log('中间件--2')
  res.end('middle ware')
}

// 使用 app.use 注册中间件
app.use(myMiddleFun1)
app.use(myMiddleFun2)


// -------------------------------路径中间件
// const pathMiddle = () => {
//   console.log('路径中间件')
//   res.end('middle ware')
// }
// app.use('/info', pathMiddle)


//--------------------------------方法中间件
// const methodMiddle = () => {
//   console.log('路径中间件')
//   res.end('middle ware')
// }
// app.get('/info', methodMiddle)


// -------------------------------连续注册中间件
// app.use((req, res, next) => {
//   console.log('middle--1')
//   next()
// }, (req, res, next) => {
//   console.log('middle--2')
//   next()
// }, (req, res, next) => {
//   console.log('middle--3')
//   res.end('连续注册中间件')
// })


// --------------------------------便携一个中间件解析 post 的 body 参数
// const parseBody = (req, res, next) => {
//   if (req.headers['content-type'] === 'application/json') {
//     let data = ''
//     req.on('data', chunk => {
//       data += chunk
//     })

//     req.on('end', () => {
//       req.body = JSON.parse(data) || {}
//       next()
//     })
//   } else {
//     next()
//   }
// }

// app.use(parseBody)

// app.post('/login', (req, res) => {
//   console.log(req.body)
//   res.end('success')
// })


// ---------------------------------- 内置中间件
// 这个功能其实就是 第三方中间件 body-parser 的功能，只是 express4.16 将其集成进了 express 中
// app.use(express.json()) // 解析 json

// // extended，为 true 代表使用第三方库 qs 解析，为 false 代表使用 Node 内置的 queryString 解析
// app.use(express.urlencoded({ extended: true })) // 解析 x-www-form-urlencoded

// app.post('/login', (req, res) => {
//   console.log(req.body)
//   res.end('success')
// })


// --------------------------------- 三方中间件 multer 处理 form-data
// 使用 multer 解析 form-data 非文件类型数据
// const multer = require('multer')

// const upload = multer()

// // app.use(upload.any()) // 用于解析 form-data 非文件类型

// app.post('/formdata', upload.any(), (req, res) => {
//   console.log(req.body)
//   res.end('success')
// })

// 使用 multer 解析 form-data 文件类型数据
// const path = require('path')
// const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: './imgs/', // 图片存储的位置
//   filename: (req, file, cb) => {
//     // callback 的第一位参数代表的错误信息
//     // file.originalname 代表上传文件的原始文件名，使用 path.extname 获取后缀
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = multer({
//   // dest: './imgs/' // 文件上传的之后要存储的路径
//   storage // 自定义文件信息
// })

// // upload.single 代表上传的是单张图片，图片是放在 键名为 file 上
// // 如果要上传多张，使用 upload.array('files')
// app.post('/upload', upload.single('file'), (req, res) => {
//   console.log(req.file)
//   res.end('上传成功')
// })


// --------------------------------- 三方中间件 morgan 处理日志
// const fs = require('fs')
// const morgan = require('morgan')

// const loggerStream = fs.createWriteStream('./logs/logger.log', { flags: 'a+' })

// // combined 是写入日志的格式，一般使用这个
// // 还需要指定一个写入流
// app.use(morgan('combined', { stream: loggerStream }))

// app.post('/login', (req, res) => {
//   res.end('success')
// })

app.listen(9000, () => {
  console.log('服务器启动: 0.0.0.0:9000')
})

