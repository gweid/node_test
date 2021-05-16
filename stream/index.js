// -------------------------------读写流
// const fs = require('fs')

// const readStream = fs.createReadStream('./test.txt', { highWaterMark: 10 })
// const writeStream = fs.createWriteStream('./test1.txt', { flags: 'a+' })

// readStream.on('data', chunk => {
//   writeStream.write(chunk, err => {
//     if (!err) {
//       console.log('写入成功');
//     }
//   })
// })


//--------------------------------管道流
const fs = require('fs')

const readStream = fs.createReadStream('./test.txt')
const writeStream = fs.createWriteStream('./test1.txt')

readStream.pipe(writeStream)

writeStream.on('close', (err) => {
  console.log('读写完成');
})