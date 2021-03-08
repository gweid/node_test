const path = require('path')

const myPath = '/node_test/code/path.js'

console.log(path.dirname(myPath)) // 结果：/node_test/code
console.log(path.basename(myPath)) // 结果：path.js
console.log(path.basename(myPath, '.js')) // 结果：path
console.log(path.extname(myPath)) // 结果：.js

console.log(path.join('/user', 'code', 'name.js')) // \user\code\name.js

console.log(path.resolve(__dirname, 'path.js')) // D:\Study\node_test\3、常用内置模块\path.js
console.log(path.resolve(__dirname, '../README.md')) // D:\Study\node_test\README.md