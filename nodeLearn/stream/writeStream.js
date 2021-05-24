const fs = require('fs')

const content = 'There are moments in life when you miss someone so much'

const writeStream = fs.createWriteStream('./test1.txt', { flags: 'a+' })

writeStream.write(content, err => {
  if (!err) {
    console.log('写入成功');
  }
})

// 写入流在打开后是不会自动关闭的，需要手动关闭
// 只有手动调用 writeStream.close 关闭才能监听 close 事件
writeStream.close()

// 调用  writeStream.close 会发出 finish 事件
writeStream.on('finish', () => {
  console.log('文件写入结束');
})

// 并不能直接监听 close
writeStream.on('close', () => {
  console.log('文件关闭');
})

// 简化上面步骤
// writeStream.end 代表写入并关闭
writeStream.end(content, (err) => {
  if (!err) {
    console.log('写入成功');
  }
})

writeStream.on('close', () => {
  console.log('文件关闭');
})