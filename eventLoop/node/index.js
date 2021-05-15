const fs = require('fs')
const { resolve } = require('path')

const filePath = resolve(__dirname, './test.txt')

fs.readFile(filePath, 'utf8', (err, data) => {
  console.log(data);
})

fs.writeFile(filePath, 'hi, Node', 'utf8', (err) => {
  if (err) {
    console.log(err);
  }
})

fs.readFile(filePath, 'utf8', (err, data) => {
  console.log(data);
})
