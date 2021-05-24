const fs = require('fs')

// 创建文件读取流
const readStream = fs.createReadStream('./test.txt', {
  encoding: 'utf8',
  highWaterMark: 10
})

// 监听文件被打开
readStream.on('open', () => {
  console.log('文件被打开');
})

// 监听流的读取
readStream.on('data', chunk => {
  console.log(chunk);

  // 暂停读取
  readStream.pause();

  // 500 毫秒之后恢复读取
  setTimeout(() => {
    readStream.resume();
  }, 500)
})

// 监听流文件读取结束
readStream.on('end', () => {
  console.log('读取结束');
})

// 读取错误
readStream.on('error', (err) => {
  console.log(err);
})

// 监听流文件关闭
readStream.on('end', () => {
  console.log('文件关闭');
})