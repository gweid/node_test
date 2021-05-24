const fs = require('fs');
const { resolve } = require('path');

const filePath = resolve(__dirname, './test.txt')

console.log('start');

setTimeout(() => {
  console.log('setTimeout--1');

  Promise.resolve().then(()=>{
    console.log('promise.then--1');
  });

  process.nextTick(() => {
    console.log('nextTick--1');
  })
});

setTimeout(() => {
  console.log('setTimeout--2');
});

setImmediate(() => {
  console.log('setImmediate--1');
});

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;
  console.log('readFile--1');

  process.nextTick(() => {
    console.log('nextTick--2');
  });
});

Promise.resolve().then(()=>{
  console.log('promise.then--2');
});

console.log('end');