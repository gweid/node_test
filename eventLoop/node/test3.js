// -----------setTimeout(fn, 0)、setImmediate(fn)执行顺序分析

// setTimeout(() => {
//   console.log('setTimeout');
// }, 0);

// setImmediate(() => {
//   console.log('setImmediate');
// });


// 在 I/O 事件中
const fs = require('fs')
const { resolve } = require('path')

const filePath = resolve(__dirname, './test.txt')

fs.readFile(filePath, 'utf8', (err, data) => {
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);

  setImmediate(() => {
    console.log('setImmediate');
  });
})