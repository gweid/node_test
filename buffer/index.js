// const bufferStr = Buffer.from('gweid')
// console.log(bufferStr)

// const bufferZh = Buffer.from('中国话')
// console.log(bufferZh) // <Buffer e4 b8 ad e5 9b bd e8 af 9d>

// const bufferZh = Buffer.from('中国话', 'utf16le')
// console.log(bufferZh) // <Buffer 2d 4e fd 56 dd 8b>

// // 转换为 buffer，默认使用 utf8
// const bufferZh = Buffer.from('中国话')
// console.log(bufferZh)

// // 对 buffer 进行解码，默认使用 utf8
// console.log(bufferZh.toString())


// 通过 buffer.alloc 创建 buffer
// const bufferStr = Buffer.alloc(4)
// console.log(bufferStr) // <Buffer 00 00 00 00>

// bufferStr[0] = 'w'.charCodeAt() // 字符串必须要通过 charCodeAt 转换
// bufferStr[1] = 100
// bufferStr[2] = 0x66

// console.log(bufferStr) // <Buffer 77 64 66 00>


// 读取文本
// const fs = require('fs')

// fs.readFile('./a.txt', (err, data) => {
//   console.log(data) // <Buffer 68 65 6c 6c 6f 2c 20 62 75 66 66 65 72>
// })

// fs.readFile('./a.txt', 'utf8', (err, data) => {
//   console.log(data) // hello, buffer
// })

// 读取图片
const fs = require('fs')

// fs.readFile('./img.png', (err, data) => {
//   console.log(data) // 
// })

// 利用 sharp 操作图片
const sharp = require('sharp')

sharp('./img.png')
  .resize(400, 300)
  .toFile('./img1.png')