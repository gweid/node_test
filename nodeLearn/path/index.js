const path = require('path')

// 从路径中获取信息
// const testPath = 'modules/user/common/utils.js'

// console.log(path.dirname(testPath)) // modules/user/common
// console.log(path.basename(testPath)) // utils.js
// console.log(path.extname(testPath)) // .js

// join 路径拼接
// const onePath = 'module/usre'
// const twoPath = 'a.js'
// const threePath = '../b.js'

// console.log(path.join(onePath, twoPath)) // module\usre\a.js
// console.log(path.join(onePath, threePath)) // module\b.js

// resolve 拼接
const onePath = './module/usre'
const twoPath = '/common/utils'
const threePath = 'b.js'

console.log(path.resolve(onePath, threePath)) // G:\node_test\module\usre\b.js
console.log(path.resolve(twoPath, threePath)) // G:\common\utils\b.js
