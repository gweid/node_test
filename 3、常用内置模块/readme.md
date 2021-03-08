### 1、内置模块 path

首先，在 window 、mac 以及 linux 上的路径不太一样

- window 上会使用 `\` 或者 `\\` 作为路径分隔符（目前也支持 `/`）
- mac 和 linux 上使用 `/` 来作为路径分隔符

所以为了屏蔽他们之间的差异，在开发中使用 path 对路径进行操作



#### 1-1、常用的 api

**获取路径信息：**

- dirname：文件所在的文件夹名
- basename：获取当前文件名
- extname：获取文件扩展名

```js
const path = require('path')

const myPath = '/node_test/code/path.js'

console.log(path.dirname(myPath)) // 结果：/node_test/code
console.log(path.basename(myPath)) // 结果：path.js
console.log(path.basename(myPath, '.js')) // 结果：path
console.log(path.extname(myPath)) // 结果：.js
```

**路径拼接：**

- 使用 join 进行路径拼接

```js
console.log(path.join('/user', 'code', 'name.js')) // \user\code\name.js
```

**resolve：**

- resolve 会判断拼接的路径前面是否有 `/`或`../`或`./`
- 如果有表示是一个绝对路径，会返回对应的拼接路径
- 如果没有，那么会和当前执行文件所在的文件夹进行路径的拼接

```js
console.log(path.resolve(__dirname, 'path.js')) // D:\Study\node_test\3、常用内置模块\path.js
console.log(path.resolve(__dirname, '../README.md')) // D:\Study\node_test\README.md
```



### 2、内置模块 fs

