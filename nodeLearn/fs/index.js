// const fs = require('fs')
// const { resolve } = require('path')

// 同步方式
// const userInfo = fs.readFileSync(resolve(__dirname, './userInfo.json'), 'utf-8')
// console.log(userInfo)

// 异步方式
// const filrPath = resolve(__dirname, './userInfo.json')
// fs.readFile(filrPath, 'utf-8', (err, state) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(state)
//   }
// })

// Promise 方式
// const filrPath = resolve(__dirname, './userInfo.json')
// fs.promises.readFile(filrPath, 'utf-8')
//   .then(state => {
//     console.log(state)
//   })
//   .catch(err => {
//     console.log(err)
//   })


// 写入文件
// const fs = require('fs')
// const { resolve } = require('path')

// const str = 'hello, Node.js\n'
// const targetPath = resolve(__dirname, './test.txt')

// fs.writeFile(targetPath, str, err => {
//   if (err) {
//     console.log(err)
//   }
// })

// fs.writeFile(targetPath, str, { flag: 'a' }, err => {
//   if (err) {
//     console.log(err)
//   }
// })


// 文件夹操作

// 创建文件夹
// const fs = require('fs')
// const { resolve } = require('path')

// const dir = resolve(__dirname, './modules')

// // 通过 fs.existsSync 判断文件开存不存在，不存在，创建
// if (!fs.existsSync(dir)) {
//   fs.mkdir(dir, err => {
//     if (err) {
//       console.log(err)
//     }
//   })
// }

// 递归读取文件夹下的所有文件
// const fs = require('fs')
// const { resolve } = require('path')

// function getFiles(dirname) {
//   fs.readdir(dirname, (err, res) => {
//     if (err) return

//     res.forEach(file => {
//       // 通过 fs.statSync 读取文件信息
//       const info = fs.statSync(resolve(dirname, file))
//       // 判断是否文件夹
//       if (info.isDirectory()) {
//         getFiles(resolve(dirname, file))
//       } else {
//         console.log(file)
//       }
//     })
//   })
// }

// const dir = resolve(__dirname, './common')
// getFiles(dir)

// function getFiles(dirname) {
//   // withFileTypes: true 表示把文件类型一起获取到
//   fs.readdir(dirname, { withFileTypes: true }, (err, res) => {
//     if (err) return

//     res.forEach(file => {
//       // 判断是否文件夹
//       if (file.isDirectory()) {
//         getFiles(resolve(dirname, file.name))
//       } else {
//         console.log(file.name)
//       }
//     })
//   })
// }

// const dir = resolve(__dirname, './common')
// getFiles(dir)

// 文件重命名
// const fs = require('fs')
// const { resolve } = require('path')

// const oldName = resolve(__dirname, './modules')
// const newName = resolve(__dirname, './src')

// fs.rename(oldName, newName, err => {
//   if (err) {
//     console.log(err)
//   }
// })
