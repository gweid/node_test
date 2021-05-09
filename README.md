# Node.js

Node.js 官网：

-  英文官网： https://nodejs.org/en/
- 中文官网：http://nodejs.cn/

node技术栈：https://www.nodejs.red/#/README



## 1、Node.js 安装、版本工具

### 1.1、安装

Node 的安装非常简单，只需要在官网上下载对应平台的安装包安装即可



Node.js 分为 LTS 版本和 Current 版本

- LTS版本：相对稳定一些，一般线上环境使用该版本
- Current 版本：最新的 Node 版本，包含更多新特性



**验证是否安装成功：**

在命令行工具输入：`node --version`，`npm --version` 如果输出版本号，那么代表安装成功

![](/imgs/img8.png)



### 1.2、版本管理工具

Node 版本管理工具作用：帮助开发者切换不同的 Node 版本

为什么？

> 因为可能有些老的项目使用的是 Node 的旧版本开发,导致很多特性不兼容，但是一台电脑不可能同时安装多个不同版本的 Node，这就造成了如果需要使用另外一个 Node 版本，需要卸载当前的 Node 重新安装



Node 版本管理工具可以帮助开发者切换不同的 Node 版本



**常用的 Node 版本管理工具:**

- window 平台： 使用 `nvm-window`，下载地址：https://github.com/coreybutler/nvm-windows/releases
- Mac、Linux 平台:
  - nvm：地址：https://github.com/nvm-sh/nvm
  - n：地址：https://github.com/tj/n



## 2、前置基础知识



### 2.1、Node.js 的定义

首先，看看官网对 Node 的定义：**node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时**

可以看出，这句话有两个核心的概念：

- Chrome V8 引擎
- JavaScript 运行时

下面就先把这两个概念搞明白



### 2.2、javascript 如何被运行

首先，在最开始的时候，JavaScript 的目的是应用于在浏览器执行简单的脚本任务，对浏览器以及其中的 DOM 进行各种操作。也就是说，最开始，JavaScript 是运行在浏览器上面的。

既然 JavaScript 运行在浏览器上，那么它到底是如何被识别运行的呢？



#### 2.2.1、浏览器内核

要了解 js 如何被运行，先从浏览器内核说起

目前，不同的浏览器，有不同的内核，但是大体上会分为以下几类：

- Gecko：早期被 Netscape 和 Mozilla Firefox 浏览器使用
- Trident：微软开发，被 IE4~IE11 浏览器使用，但是后面 Edge 浏览器已经转向 Blink
- Webkit：苹果基于 KHTML 开发、开源的，用于 Safari，Google Chrome 之前也在使用
- Blink：是 Webkit 的一个分支，Google 开发，目前应用于 Google Chrome、Edge、Opera 等

浏览器内核其实一般是包括渲染引擎和 js 引擎的。

但是，**现在说的浏览器内核，可能更多的是指：浏览器的排版引擎，或者说浏览器渲染引擎，主要用来渲染页面的**



来看看渲染引擎的基本工作流程：

![](/imgs/img2.png)

但是这个流程有一个问题，就是通常在编写 html 代码的时候，会在里面嵌入 script 便签去加载 js 代码，这些 js 代码可以去操纵浏览器的 dom 等。那么既然有 js 代码，那么就需要一个东西去执行它，这个执行 js 代码的就叫做 js 渲染引擎（js 是高级语言，必须被转换成汇编语言，最后转换成机器语言，才能被 cpu 所执行，所以就依赖于 js 渲染引擎进行转换）。

补充知识点：

- 在这个执行压面渲染过程中，HTML 解析的时候遇到了script 标签，应该怎么办呢

  > 会停止解析 HTML，而去加载和执行 JavaScript 代码

- 为什么不直接异步去加载执行JavaScript代码，而要在这里停止掉呢

  > 这是因为 js 可以操作浏览器的 DOM，所以浏览器希望将 HTML 解析的 DOM 和 js 操作之后的 DOM 放到一起来生成最终的 DOM 树，而不是频繁的去生成新的 DOM 树



#### 2.2.2、javascript 引擎

js 代码无论是交给浏览器还是其他的什么容器来执行，最终都是需要生成机器语言，被 CPU执行的，所以就需要一个工具来帮助将 js 代码转换成机器码。这个工具就是 javascript 引擎。



**常见的 js 引擎：**

- SpiderMonkey：第一款 JavaScript 引擎，由 Brendan Eich(JavaScript作者) 开发
- Chakra：微软开发，用于 IT 浏览器
- JavaScriptCore：WebKit 中的 JavaScript 引擎，Apple 公司开发
- V8：Google 开发的强大 JavaScript 引擎

除掉 ie 浏览器，目前最常见的还是 JavaScriptCore 以及 V8



**先看看 JavaScriptCore：**

 JavaScriptCore 更多的是使用在 Webkit 中，事实上，Webkit 最重要的两部分就是：

- webCore：负责 html、css 解析、布局、渲染等等相关的工作
- JavaScriptCore：：解析、执行 JavaScript 代码

![](/imgs/img3.png)



**V8 引擎：**

V8 是用 C++ 编写的 Google 开源高性能 JavaScript 和 WebAssembly（未来可能成为另外一种前端语言标准） 引擎，它**用于 Chrome 和 Node.js 等**，可以独立运行，也可以嵌入到任何 C++ 应用程序中



简单了解一下 V8 引擎的原理：

![](/imgs/img4.png)

根据上图，简单概括一下就是：Parse 将 js 源代码转换为 ast，lgnition 将 ast 解析成字节码，TurboFan 将字节码转换为经过优化的机器码，最后机器码运行在 CPU 上

举个例子，比如：

```js
function add(one, two) {
    return one + two
}
```

- 正常流程是会按照上面的走一遍
- 但是如果 add 函数没有被调用，则 V8 不会去编译它
- 如果 add 函数只被调用1次，则 Ignition 将其编译字节码就直接解释执行了。TurboFan 不会进行优化编译，因为它需要 Ignition 收集函数执行时的类型信息。这就要求函数需要执行1次以上，TurboFan 才有可能进行优化编译
- 如果函数被调用多次，则它有可能会被识别为热点函数，且 Ignition 收集的类型信息证明可以进行优化编译的话，这时 TurboFan 则会将字节码编译为优化过的机器码，以提高代码的执行性
- 其中字节码与优化过的机器码可能是逆向的，也就是机器码被还原成字节码；这是因为，比如 add 函数调用了两次，第一次的参数都是 number 类型，但是第二次的参数却变成了 string 类型，那么就会造成与优化机器码假定的函数类型冲突，会被还原成字节码

所以，平时写代码的时候，最好是要固定一些函数的职能，比如说 add 函数，它的职能只是单一的计算两个数之和，而不要进行其他 string 类型的运算，这样能更好的提高 v8 引擎的解析性能



## 3、Node.js 基础

前面说过，V8 是可以独立运行的；事实上，像谷歌浏览器、Node.js 都是嵌入了 V8 引擎来做 js 的解析。

Node.js 基于 V8 引擎，也就是说使用 V8 引擎来执行 js 代码，但是 Node.js 又不等于 V8，它还有一些其它的东西。

就像浏览器一样，不仅仅只是处理 js，还需要各种各样的进程、事件循环、操作浏览器的 api 等等。Node.js 也一样，除了解析 js 需要使用 V8 引擎以外，还需要一些额外的操作，比如文件系统读/写、网络IO、加密、压缩解压文件等操作。



### 3.1、Node.js 基础架构

#### 3.1.1、Node.js 的基本分层

![](/imgs/img5.png)

**上层：**

这一层是 Node 标准库，比如 Http, Buffer, fs 等模块，在开发的时候可以通过 js 直接调用相关 API 这些模块来实现相关功能

**中间层：**

Node bindings（由 c++ 实现）：是沟通 JS 和 C++ 的桥梁，封装 V8 引擎 和 Libuv 的细节，向上层提供基础 API 服务。比如：C/C++ 实现了一个 http_parser 的库，非常高效，但是前端开发人员只会写 JavaScript，直接调用这个库肯定是不能成功的，所以就需要一个中间的桥梁。Node bindings 就是这个中间桥梁

C/C++ Addons：就是支持开发人员自定义封装 C/C++ 来扩展想要实现的功能

**下层：**

这一层，是 Node.js 运行时的关键，基本由 C/C++ 实现

- V8：谷歌开发的 JavaScript 引擎，用于将 js 代码解析为能被 CPU 执行的机器码
- Libuv：一个高性能的事件驱动 I/O 库，并且提供了跨平台（如 Windows、Linux）的API。提供了事件循环、文件系统读写、网络IO、线程池等等内容
- c-ares：由 C 语言实现的异步 DNS 库
- http_parser、open_SSL、zlib等：提供一些其他能力



#### 3.1.2、Node.js 工作流程

![](/imgs/img7.png)



#### 3.1.3、Node.js 与谷歌浏览器的一些区别

先看看下面这张图：

![](/imgs/img6.png)

可以看到，在谷歌浏览器中，HTML/CSS 交给 Blink 内核处理，js 交给 V8 引擎处理。而在 Node 中，不处理 UI 层，但是却与浏览器以相同的机制和原理运行，并且在中间层这里基于 libuv 有着自己更加强大的功能



### 3.2、简单把 Node.js 跑起来

比如有一个 server/index.js 文件：

```js
console.log('hello, Node.js')
```

只需要在终端执行 `node server/index.js` 即可看到输出结果



### 3.3、Node 传递参数与接收参数

传递参数：只需要在执行 node 命令的时候，在后面跟上参数即可

```js
node server/index.js env=production gweid
```



获取参数：通过 node 的全局变量 process 获取：

> server/index.js

```js
console.log(process.argv)
```

可以看到：

![](/imgs/img9.png)

可以看到 process.argv 是一个数组，里面包含了刚刚传递进去的参数



### 3.4、Node 全局对象

Node 文档位置：https://nodejs.org/dist/latest-v14.x/docs/api/globals.html



#### 3.4.1、特殊的全局对象

特殊的全局对象：能够在模块中任意使用，但是在命令行交互中是不可以使用的

比如： `__dirname`， `__filename`， `exports`， `module`， `require()`

其中：  `exports`， `module`， `require()` 是与模块化相关，后面再详细描述



`__dirname`：获取当前文件所在的路径（不包括文件名）

`__filename`：获取当前文件所在的路径（包括文件名）

![](/imgs/img10.png)



#### 3.4.2、常用的全局对象

还有一些常用的全局对象：

- console：用于调试控制台
- process：process 提供了 Node 进程中相关的信息，比如 Node 的运行环境还有一些参数等
- buffer：用于处理二进制数据（后面再详细描述）
- 定时器相关：（定时器相关的更多的与事件循环相关）
  - setTimeout(callback, delay[, ...args\])，间隔多少毫秒后执行，只执行一次；可以使用 clearTimeout(timeoutObject) 清除
  - setInterval(callback, delay[, ...args\])，没多少毫秒执行一次，重复执行；可以使用 clearInterval(intervalObject) 清除
  - setImmediate(callback[, ...args\])，同步执行完后，立即执行，不需要跟时间。（在事件循环时再详细描述）；可以使用 clearImmediate(immediateObject) 清除
  - process.nextTick(callback[, ...args])：添加到下一次 tick 队列中执行
- global：例如 process、console、setTimeout 等都被放到了 global 中，与浏览器的 window 对象类似
  - 浏览器的 window：挂有 document、setTimeout、alert、console 等等全局对象
  - Node 的 global：也挂有 process、console、setTimeout 等
  - 两者的一些区别：在浏览器中顶层中，通过 var 声明的变量会被挂载到 window 上；但是在 Node 中, var  声明的变量不会挂载到 global 上，仅仅在当前模块中。这主要是在浏览器中，是没有模块的概念的，而 Node 中会有模块的概念，那么就需要限制当前模块的变量仅仅在当前模块生效。其他的模块需要用到这个变量，那么可以通过导出导入的方式



## 4、模块化

在早期，js 仅仅作为一门简单的脚本语言，做一些简单的表单验证或动画实现等。但是随着前端和 js 的快速发展，js 代码变得越来越复杂：

- ajax 的出现，前后端开发分离，意味着后端返回数据后，需要通过 js 进行前端页面的渲染

- SPA 的出现，前端页面变得更加复杂：前端路由、状态管理等等一系列复杂的需求需要通过 js 来实现

- 在 Node 中，js 编写复杂的后端程序，没有模块化是致命的硬伤

以上，都需要模块化来进行更好的管理，但是 js 在 es6 才推出官方的模块化方案。在此之前，为了让 js 支持模块化，社区涌现出了很多不同的模块化规范：AMD、CMD、CommonJS 等



### 4.1、模块化开发

#### 4.1.1、模块化开发的过程就是：

- 将程序划分成一个个小的结构
- 在这个结构中可以编写属于自己的逻辑代码，有自己的作用域，不会影响到其他的模块结构
- 并且可以将自己希望暴露的变量、函数、对象等导出给其结构使用
- 也可以通过某种方式，导入另外结构中的变量、函数、对象等



#### 4.1.2、没有模块化带来的一些问题

- 全局作用域被污染
- 开发人员必须手动解决模块依赖关系（顺序）
- 在大型、多人合作项目中，会导致整体架构混乱
- ......



### 4.2、模块化方案

早期，为了避免全局作用域被污染问题一般都是使用**立即执行函数处理（IIFE）**

比如：

a.js 中：

```js
var moduleA = (function() {
  var userName = '张三'

  console.log('a模块：', userName)
  
  // 将要导出给其他地方使用的用 return 返回
  return {
    userName
  }
})()
```

b.js 中：

```js
// 定义了一个全局的 userName
var userName = '李四'

console.log('b模块：', userName)
```

c.js 中：

```js
// 使用 moduleA 中的 userName
console.log('c模块：', moduleA.userName)
```

index.html 中：

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <script src="./a.js"></script>
    <script src="./b.js"></script>
    <script src="./c.js"></script>
</body>
</html>
```

打印结果：

![](/imgs/img11.png)

可以看出，IIFE 解决了全局作用域被污染的问题，将 c.js 中需要使用的 userName 放到了 moduleA 中



但是这样也会带来很多问题：

- 模块的命名也会冲突，比如 a.js 中使用了 moduleA，如果其他地方也使用了 moduleA 就会造成冲突
- 代码写起来混乱不堪，每个文件中的代码都需要包裹在一个匿名函数中来编写
- 没有一定的规范去约束模块化代码的编写，这也是灾难性的
- ......



#### 4.2.1、CommonJs

CommonJs 是一种模块化规范，最初是叫 ServerJS，用于浏览器以外的地方使用，后来也被用于浏览器，为了体现它的广泛性，修改为 CommonJS，简称 CJS。

- CommonJs 在服务端的体现：Node
- CommonJs 在浏览器的体现：Browserify
- webpack 中也支持 CommonJS



**Node 中的 CommonJs**

在 Node 中，对 CommonJs 实现了支持:

- 在 Node中 每一个 js 文件都是一个单独的模块
- 每个 js 模块都可以进行导入导出
  - exports 和 module.exports 可以帮助进行模块导出
  - require 可以帮助进行模块（自定义模块、系统模块、第三方模块）导入



**Node.js 的 exports 对象 **

例子：

a.js：

```js
const msg = 'hello, CommonJs'

exports.msg = msg
```

index.js：

```js
const { msg } = require('./a')

console.log(msg) // hello, CommonJs
```



每一个模块的 exports 默认是一个空对象{}，可以往 exports 身上挂属性，最后这些挂载在 expoers 上的属性都会随着 exports 被导出

require 是一个函数，这个函数返回一个对象，在这里就是 a.js 的 exports 对象，可以使用解构的方式拿到里面的 msg，当然，也可以

```js
const moduleA = require('./a')

console.log(moduleA.msg) // hello, CommonJs
```

不使用结构的方式，直接将 exports 对象赋值给 moduleA，然后通过 moduleA.xxx 的方式调用



也就是说：**moduleA 与 exports 其实就是同一个对象，moduleA 是 exports 的浅拷贝**

这得益于： js 中的复杂数据类型，会在堆中开辟一块内存空间存储这个复杂类型，这个堆中存储的复杂类型会有自己的内存地址，内存地址保存在栈中。将这个复杂类型赋值给另外一个，实际上只是将栈中的内存地址复制了一份，而这两份地址都指向堆中的同一个

比如：

```js
const info = { name: 'jack' }

const newInfo = info
```

![](/imgs/img12.png)

同理，exports 可以理解为 info，moduleA 就可以理解为 newInfo

这也意味着，无论是通过 exports 改变还是 moduleA 改变里面的属性，都会互相影响。所以一般不直接修改 moduleA 的属性，因为这样子会影响数据源。一般是通过深拷贝一份数据，再操作。



**Node.js 的 module.exports**

module.exports 与 exports 的关系：

- 为了实现模块导出，Node 中使用了 Module 类，每一个模块（js 文件）都是一个 Module 类的实例，也就是 module
- 所以在 Node 中真正用于导出的不是 exports，而是 module.exports；在另外一个模块引入的也是 module.exports

证明：

a.js：

```js
const msg = 'hello, CommonJs'

exports.msg = msg

console.log(module)
```

可以看到，打印出来的 module：

![](/imgs/img13.png)



> 问题：为什么 exports 也可以进行导出？

实际上，在 Node 的源码中做了一件事，就是将 module.exports 与 exports 同时指向了同一个对象

```js
exports = module.exports = {}
```

所以，可以通过 exports.xxx 这样子往 exports 上挂属性，**实际上修改的都是同一个对象，但是导出还是 mdule.exports 导出，在另外一个模块引入的也是 module.exports**。所以，**一旦手动改变 module.exports 或者 exports 的指向，那么将会有所改变**

先来看看第一个例子：

b.js：

```js
const str = 'hello, module.exports'

exports.name = '哈哈哈哈'

module.exports = {
  str
}
```

index.js：

```js
const moduleB = require('./b')

console.log(moduleB)
```

执行结果输出：

![](/imgs/img14.png)

可以看到，上面 通过 `moduele.exports = {}` 的方式改变了指向，那么 module.exports 和 exports 指向的就不是同一个对象，而真正导出的是 module.exports，所以在另外一个模块引入的只是 module.exports 对象，只会输出 `{ str: 'hello, module.exports' }`，而 exports.name 的修改就不会输出



接着看看第二个例子：

b.js：

```js
const str = 'hello, module.exports'

exports = {
  str
}
```

index.js：

```js
const moduleB = require('./b')

console.log(moduleB)
```

执行结果输出：

![](/imgs/img15.png)

输出的居然是一个空对象。这也是因为 Node 中实际上导出的是 module.exports，一开始，默认就是

```js
module.exports = exports = {}
```

而 `exports = {}` 修改了 exports 的指向，使得 exports 与 module.exports 修改的不是同一个，不会相互影响，而在 index.js 中引入的还是 module.exports，所以输出的是空对象 {}。

通过上面两个例子，已经可以完全证明：**在 Node 中真正用于导出的不是 exports，而是 module.exports；在另外一个模块引入的也是 module.exports**



> 那么又有一个问题：既然真正导出的是 module.exports，那么 exports 就感觉可有可无了

确实，在 Node 中，其实是可以完全不用 exports 的，那么 Node 为什么会实现一个 exports 呢？因为，Node 是遵循 CommonJs 规范的，CommonJs 规范要求要有一个 exports 导出。但是实际上 CommonJs 中是没有module.exports 概念的，可以理解为，Node 的 CommonJs 是在社区原有的 CommonJs 规范上实现的符合自身的 2.0 版本



**Node 的导入函数 require**

require 主要用来引入一个文件（模块）中导入的对象；它有自己的一套查找规则，具体可以参考：https://nodejs.org/dist/latest-v14.x/docs/api/modules.html#modules_all_together

现在以 `require(xxx)` 为例，来看看一些常见的查找规则：

- 当 xxx 是一个 Node 内置核心模块，比如 path、fs 等，那么会直接返回核心模块，并且停止查找

- 当 xxx 是以 `./`  或 `../` 或 `/`（根目录）开头的

  1. 首先将 xxx 当做一个文件去查找
     1. 如果有后缀名，根据后缀名查找，没找到，报错：not found，模块找不到
     2. 没有后缀名
        1. 先直接查找 xxx 文件
        2. 没找到，按照 xxx.js 查找
        3. 没找到，按照 xxx.json 查找
        4. 没找到，按照 xxx.node 查找

  2. 将 xxx 当做一个文件没找到，那么接下来将 xxx 当做一个文件夹去查找，查找 xxx 目录下的 index 文件
     1. 先查找 xxx/index.js
     2. 没找到，查找 xxx/index.json
     3. 没找到，查找 xxx/index.node

  上面1、2 步都没有找到，那么就会报错：not found，模块找不到

- 当 xxx 是 `require('gweid')`，**并且不是 Node 内置核心模块**

  比如，在 `src/user/common/main.js` 中，编写了 `require('gweid')`

  1. 首先去 `src/user/common/node_modules` 中查找，有没有 gweid
  2. 没找到，去 `src/user/node_modules` 中查找
  3. 没找到，去 `src/node_modules` 中查找
  4. 没找到，去 `node_modules` 中查找

  最后还是没找到，报错：not found，模块找不到。实际上就是将 gweid 当成了 npm 安装的第三方包，那么就会在各个目录的 node_modules 中查找，直到最顶层的 node_modules



**Node 中模块加载**

1. 在模块第一次被引入是，里面的 js 代码会执行一次

2. 模块被多次引用，会被缓存，最终只会加载一次。每个模块都有一个 loaded 属性，loaded=false 代表没有被加载过；loaded=true 代表已加载，会被缓存起来

3. 如果一个模块被循环引入，例如：

   ![](/imgs/img16.png)

   很明显看到，c.js 同时被 a.js、b.js 引入，e.js 同时被d.js、b.js 引入，那么此时的加载顺序是什么呢？

   在 Node 中，采用的是深度优先算法，也就是模块加载顺序是：index.js --> a.js --> c.js --> d.js -->e.js --> b.js，其中遇到被加载过的模块，也就是模块的 loaded 被标记为 true 了，不会再去加载

采用深度优先算法的主要原因就是 **CommonJs 是同步加载**的，这就意味着：

```js
const moduleA = require('./a')
const moduleB = require('./b')
```

要等 moduleA 里面的所有逻辑加载完，才开始加载 moduleB



> 问题：CommonJs 同步加载不会有很大的性能问题吗

性能影响不会很大，因为 Node 是在服务端执行的，那么就意味着所有的文件都是在同一个服务器中，这就相当于在同一台电脑下操作不同目录文件而已，这是非常快的。

如果实在客户端进行同步加载，就会带来很大的性能问题，因为这意味着需要从服务器中把文件下载下来，这就会严重收到文件大小、网络等的影响，阻塞后面的加载。所以在客户端一般不使用同步加载的模式。



所以在早期为了可以在浏览器中使用模块化，主要使用的方案有两种：AMD 和 CMD

但是，由于 webpack 等工具可以实现对 Commons 或者 ES Module代码的转换，并且现代浏览器开始逐步支持 ES Moudle，AMD 和 CMD 其实已经很少使用了。更多的是在服务端使用 CommonJs，在浏览器端使用 es6 的模块化方案（低版本浏览器使用 webpack 转换）



#### 4.2.2、Node 中使用 ES Module

在 Node 14 以后，开始支持使用 ES Module，但是使用需要遵循一定的条件限制。

- 第一种方式，在 package.json 中配置  type: 'module'
- 第二种方式，使用 \.mjs 文件

看看 \.mjs 文件的方式：

基本目录结构：

```
ESModule
├── modules
│   └── a.mjs
└── index.mjs
```

> modules/a.mjs

```js
const moduleInfo = 'this is moduleA'

export {
  moduleInfo
}
```

> index.mjs

```js
import { moduleInfo } from './modules/a.mjs'

console.log(moduleInfo)
```

然后执行 `node index.mjs`，可以看到正常输出，没有报错



## 5、Node 常用的内置模块

Node 中有非常多内置模块，这些内置模块构成了 Node 强大的能力。



### 5.1、path 模块

path 模块主要用于对路径的处理。

在 Mac OS、Linux 和 window上 的路径分割符不一样的

- window上会使用 `\`或者 `\\` 来作为文件路径的分隔符，虽然目前也支持 `/`
- Mac OS 和 Linux 上使用 `/` 作为文件路径分割符

那么这就带来了一个问题：在 window 上使用 `\` 作为分隔符开发了一个应用程序，需要不是到 Linux 上该怎么办？

path 模块就是解决这种问题的，用于抹平不同操作系统分隔符之间的差异



#### 5.1.1、path 常用 API

**从路径中获取信息：**

- dirname：获取文件的父文件夹
- basename：获取文件名
- extname：获取文件扩展名

```js
const testPath = 'modules/user/common/utils.js'

console.log(path.dirname(testPath)) // modules/user/common
console.log(path.basename(testPath)) // utils.js
console.log(path.extname(testPath)) // .js
```



**路径拼接： path.join**

如果想将多个路径进行拼接，但是不同的操作系统可能使用的是不同的分隔符，那么可以使用 path.join

```js
const onePath = 'module/usre'
const twoPath = 'a.js'
const threePath = '../b.js'

console.log(path.join(onePath, twoPath)) // module/usre/a.js
console.log(path.join(onePath, threePath)) // module/b.js
```



**将某个文件与某个文件夹拼接： path.resolve**

resolve 函数会判断拼接的路径前面是否有 `/` 或 `./` 或 `../`

这是什么意思呢？看看下面例子的输出：

```js
const onePath = './module/usre'
const twoPath = '/common/utils'
const threePath = 'b.js'

console.log(path.resolve(onePath, threePath)) // G:\node_test\module\usre\b.js
console.log(path.resolve(twoPath, threePath)) // G:\common\utils\b.js
```

可以发现，resolve 会把当前文件所在的全路径拼接，而 join 只是单纯的将两个路径加在一起



### 5.2、fs 模块

fs 模块在 Node 中是用于操作文件系统的，可以在任何的操作系统（window、Mac OS、Linux）上面直接去操作文件；这也是 Node可以开发服务器的一大原因，也是它可以成为前端自动化脚本等热门工具的原因。



fs 提供了特别多的 api，这些 api 一般都提供了 3 中使用方式：

- 方式一：同步操作文件，代码会被阻塞

  ```js
  const fs = require('fs')
  const { resolve } = require('path')
  
  const userInfo = fs.readFileSync(resolve(__dirname, './userInfo.json'), 'utf-8')
  console.log(userInfo)
  ```

- 方式二：异步回调函数操作文件，代码不会被阻塞，需要传入回调函数，当获取到结果时，回调函数被执行

  ```js
  const filrPath = resolve(__dirname, './userInfo.json')
  fs.readFile(filrPath, 'utf-8', (err, state) => {
    if (err) {
      console.log(err)
    } else {
      console.log(state)
    }
  })
  ```

- 方式三：异步 Promise 操作文件，代码不会被阻塞，通过 fs.promises 调用方法操作，会返回一个 Promise，可以通过 then、catch 进行处理（需要看看 api 是否支持 promise）

  ```js
  const filrPath = resolve(__dirname, './userInfo.json')
  fs.promises.readFile(filrPath, 'utf-8')
    .then(state => {
      console.log(state)
    })
    .catch(err => {
      console.log(err)
    })
  ```



#### 5.2.1、读写文件

读取文件：fs.readFile(path[, options], callback)

写入文件：fs.writeFile(file, data[, options], callback)



看看写入文件的例子：

```js
const str = 'hello, Node.js'
const targetPath = resolve(__dirname, './test.txt')

fs.writeFile(targetPath, str, err => {
  if (err) {
    console.log(err)
  }
})
```

writeFile 的几个参数：

- file：写入文件的路径
- data：写入文件的内容
- [, options]：可选参数，可以是字符串，也可以是对象
  - flag：写入的方式
    - w：打开文件写入，写入时的默认值就是这个
    - w+：打开文件进行读写，如果文件不存在创建文件
    - r：打开文件进行读取，读取时的默认值就是这个
    - r+：打开文件进行读写，如果文件不存在抛出异常
    - a：打开要写入的文件，将内容追加到文件末尾，如果文件不存在创建文件
    - a+：打开文件进行读写，将内容追加到文件末尾，如果文件不存在创建文件
  - encoding：字符的编码，一般来讲使用 utf-8
- callback：写入成功后回调



#### 5.2.2、文件夹操作

**创建文件夹：**

```
const fs = require('fs')
const { resolve } = require('path')

const dir = resolve(__dirname, './modules')

// 通过 fs.existsSync 判断文件开存不存在，不存在，创建
if (!fs.existsSync(dir)) {
  fs.mkdir(dir, err => {
    if (err) {
      console.log(err)
    }
  })
}



**递归读取文件夹下的所有文件：**

- 第一种方法，通过 fs.stat 判断是否文件夹

  ```js
  function getFiles(dirname) {
    fs.readdir(dirname, (err, res) => {
      if (err) return
  
      res.forEach(file => {
        // 通过 fs.statSync 读取文件信息
        const info = fs.statSync(resolve(dirname, file))
        // 判断是否文件夹
        if (info.isDirectory()) {
          getFiles(resolve(dirname, file))
        } else {
          console.log(file)
        }
      })
    })
  }
  
  const dir = resolve(__dirname, './common')
  getFiles(dir)
```

- 第二种方法：通过 fs.readdir 的 withFileTypes: true 在读取的时候把文件类型一起获取

  ```js
  function getFiles(dirname) {
    // withFileTypes: true 表示把文件类型一起获取到
    fs.readdir(dirname, { withFileTypes: true }, (err, res) => {
      if (err) return
  
      res.forEach(file => {
        if (file.isDirectory()) {
          getFiles(resolve(dirname, file.name))
        } else {
          console.log(file.name)
        }
      })
    })
  }
  
  const dir = resolve(__dirname, './common')
  getFiles(dir)
  ```



**文件重命名：**

```js
const fs = require('fs')
const { resolve } = require('path')

const oldName = resolve(__dirname, './modules')
const newName = resolve(__dirname, './src')

fs.rename(oldName, newName, err => {
  if (err) {
    console.log(err)
  }
})
```



...... 除了上面的，还有很多常用的 fs api，具体在需要使用到的时候，只需要查询文档即可：https://nodejs.org/dist/latest-v14.x/docs/api/fs.html



### 5.3、event 模块

Node 中的事件总线



#### 5.3.1、事件播报、监听、关闭

- 通过 \.on 或者 \.addListener 监听事件
- 通过 \.emit 播报事件
- 通过 \.off 关闭事件

```js
const EventEmitter = require('events')

const eventBus = new EventEmitter()

const clickEvent = (args) => {
  console.log(args)
}
// 事件监听
eventBus.on('click', clickEvent)

// 事件播报
setTimeout(() => {
  eventBus.emit('click', { msg: 'hello' })

  // 取消事件监听
  eventBus.off('click', clickEvent)
}, 1000)

// 上面已经取消，这里播报的不会再被监听到
setTimeout(() => {
  eventBus.emit('click', { msg: 'hihihi' })
}, 2000)
```



#### 5.3.2、event 的一些其他方法

- \.once：只监听一次

  ```
  const EventEmitter = require('events')
  const eventBus = new EventEmitter()
  
  const clickEvent = (args) => {
    console.log(args)
  }
  // 只监听一次
  eventBus.once('click', clickEvent)
  
  setTimeout(() => {
    eventBus.emit('click', { msg: 'hello' })
  }, 1000)
  setTimeout(() => {
    eventBus.emit('click', { msg: 'hihihi' })
  }, 2000)
  ```

- \.removeAllListeners([eventName])：移除所有监听事件，参数是一个字符串或者数组，不传代表移除所有事件监听，传入例如： ‘click’ 或者 ['click']，代表移除所有 click 事件监听

  ```js
  const EventEmitter = require('events')
  const eventBus = new EventEmitter()
  
  eventBus.on('click', (args) => {
    console.log(args)
  })
  eventBus.on('tap', (args) => {
    console.log(args)
  })
  
  setTimeout(() => {
    eventBus.emit('click', { msg: 'hello' })
    eventBus.emit('tap', { info: 'message' })
  
    // 移除所有监听
    // eventBus.removeAllListeners()
    // 移除所有 click 事件监听
    eventBus.removeAllListeners(['click'])
  }, 1000)
  
  setTimeout(() => {
    eventBus.emit('click', { msg: 'hello' })
    eventBus.emit('tap', { info: 'message' })
  }, 2000)
  ```



其他的一些方法也是当需要使用到的时候，参考文档即可：https://nodejs.org/dist/latest-v14.x/docs/api/events.html



## 6、npm 包管理

当我们或者别人开发了一个很好用的轮子，想要将代码分享出去，可以使用 npm 工具将代码发布到特定的位置，其他想要使用的人就可以直接通过工具来安装、升级、删除共享的代码。

npm 地址： https://www.npmjs.com/

上传到 npm 上的包实际上是存储到 registry 仓库上面，需要安装时，也是从 registry 仓库上面下载。



可参考文章：

[前端工程化 - 剖析npm的包管理机制](https://juejin.cn/post/6844904022080667661)



### 6.1、配置文件 package.json

如果想要使用 npm 安装别人的包，就需要初始化一个 npm 的环境，执行命令： `npm init`，然后根据提示完善项目自定义信息，初始化完成后会在目录中多一个 package.json 的文件。

当然，如果不想繁琐的去一步一步完善信息，也可以直接执行 `npm init -y`，会跳过完善自定义信息的步骤，以默认配置生成 package.json。



#### 6.1.1、package.json 常见属性

```js
{
  "name": "npmpackage",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "main": "index.js", 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dayjs": "^1.10.4"
  },
  "devDependencies": {
    "@babel/core": "^7.14.0"
  }
}
```

- name：项目名称
- version：项目当前版本
- description：项目描述信息
- author：项目作者相关信息【发布时需要用到】
- license：开源协议【发布时需要用到】
- private：记录当前项目是否私有，值为 true，表示 npm 不能发布它，防止私有项目或模块被发布出去
- keywords：关键词【发布后在 npm 官网上可以通过这里的关键字搜索到】
- main：设置项目的主入口，这代表当 `require(xxx)` 的时候是找 xxx 的哪个文件，比如这里的`main: index.js` 代表会找到项目根目录的 index.js 文件
- scripts：用于配置一些脚本命令，以键值对的形式存在；配置后可以通过 `npm run key` 来执行这个命令
- dependencies：指定无论开发环境还是生产环境都需要依赖的包。执行 `npm i dayjs -S` 安装的包就会分配到这里面
- devDependencies：这里的包只在开发环境使用，在生产环境不需要。执行 `npm i @babel/core -D` 安装的包就会分配到这里面



#### 6.1.2、包的版本号

在安装的 npm 包后面，一般都会带着版本号，例如：

```js
"dependencies": {
  "dayjs": "^1.10.4"
},
"devDependencies": {
  "@babel/core": "^7.14.0"
}
```

npm 的版本号通常需要遵循 semver 版本规范，具体可以查看：https://semver.org/lang/zh-CN/



**semver 标准版本规范**

一般是 `X.Y.Z` 的方式，即 `主版本号.次版本号.修订号`

- X：主版本号，当你做了不兼容的 API 修改（可能不兼容之前的版本）
- Y：次版本号，当你做了向下兼容的功能性新增（新加了功能，兼容之前版本）
- Z：修订号，当你做了向下兼容的问题修正（没有新功能，修复之前版本的 bug）

但是也不一定百分百遵循这个规范，不如有些 2.5.1 --> 2.6.1 可能会抛弃掉某些功能，导致了不兼容。但是大体上是会遵循这个规范的。



版本前面的 `^` 以及 `~` 的意义，例如：

- `^x.y.z`：表示 x 保持不变，y 和 z 永远安装最新版本；也就是说当 npm i 去重新下载包的时候，如果当前 package.json 中的 y 或 z 落后于远端包仓库的 y、z，那么会下载最新的，并且更新本地包代码和版本号；x 版本号落后于远端包仓库的 x，不会去下载最新的，如果需要更新包，需要 `npm install xxx@x.y.z ` 这样指定新版本号去下载。这样子避免了新版本的包与当前代码不兼容的问题。
- `~x.y.z`：表示 x、y 保持不变，z 永远安装最新版本



**semver 先行版本**

当某个版本改动比较大、并非稳定而且可能无法满足预期的兼容性需求时，可能需要先发布一个先行版本。

先行版本号可以加到 `主版本号.次版本号.修订号` 的后面，两者间一般以 `-` 作连接符

- alpha：内部版本
- beta：公测版本
- rc，即 Release candiate：正式版本的候选版本

例子：

```js
1.1.1-alpha
2.2.1-beta
3.3.3-rc
```



### 6.2、package-lock.json 文件

在 npm 更新到 v5.x.x 以后，安装第三方包会会自动生成一个  package-lock.json；比如，当使用 npm i axios -S 的时候，会生成一个 package-lock.json 文件。



#### 6.2.1、package-lock.json 的作用

主要就是锁定当前使用的库的版本。因为在 package.json 中， `^x.y.z` 只能锁定 x，`~x.y.z` 只能锁定 x、y，版本 z 肯定锁不定的，你不能保证所有的包版本都完全按照 semver 版本规范来，如果 z 版本也涉及到兼容，那么对项目来说，将会是毁灭性的。而 package-lock.json 就是帮助我们锁定当前版本的（具体到 z 小版本）。

> 使用 package-lock.json 要确保 npm 的版本在5.6以上，因为在5.0 - 5.6中间，对 package-lock.json 的处理逻辑进行过几次更新，5.6版本后处理逻辑逐渐稳定



**下面以 vue 的安装为例子说明：**

> 例1：没有 package-lock.json 的情况下

```js
// package.json

"dependencies": {
  "vue": "^2.2.0"
}
```

当没有 package-lock.json 文件，而且 package.json 中：vue 的版本是 2.2.0；但是当前最新的 vue2.x 版本是 2.6.12，那么此时执行 `npm install` 的时候，会发现：生成了 package-lock.json 文件，并且：

- package.json 中显示的 vue 版本还是 2.2.0

  ![](/imgs/img18.png)

- 但是 package-lock.json 中 vue 的版本自动升级为 2.6.12

  ![](/imgs/img19.png)

- 再看 node_modules 中 vue 的版本也是 2.6.12

  ![](/imgs/img20.png)

这就说明，在没有 package-lock.json 的情况下，而 package.json 的 vue 版本号前带 `^`，那么符合自动升级原则就会自动升级



> 例2、存在 package-lock.json 的情况1

```js
// package.json

"dependencies": {
  "vue": "^2.2.0"
}


// package-lock.json
"dependencies": {
  "vue": {
    "version": "2.2.0",
    "resolved": "https://registry.npm.taobao.org/vue/download/vue-2.2.0.tgz",
    "integrity": "sha1-9FhpIM421TlEqyesUjbtkwOka0c="
  }
}
```

删除 node_modules 重新进行 `npm install`，会发现无论是 package.json 或是 package-lock.json 或是 node_modules 的 vue 版本都是 2.2.0，不会说当前 vue2.x 的最新版本是 2.6.12 就自动升级安装 2.6.12 版本。

此时，如果想要将 vue2.2.0 升级为 2.6.12，可以执行 `npm i vue@2.6.12 -S` ，那么就会同时更新 package.json、package-lock.json 和 node_modules 中 vue 的版本为 2.6.12。



> 例3：存在 package-lock.json 的情况2

```js
// package.json

"dependencies": {
  "vue": "^2.2.0"
}


// package-lock.json
"dependencies": {
  "vue": {
    "version": "2.2.0",
    "resolved": "https://registry.npm.taobao.org/vue/download/vue-2.2.0.tgz",
    "integrity": "sha1-9FhpIM421TlEqyesUjbtkwOka0c="
  }
}
```

本来 package.json 和 package-lock.json 中的 vue 版本都是 2.2.0

但是如果手动将 package.json 中的 vue 版本升级，修改为 `"vue": "^2.3.0"`：

- 在对比 package.json 与 package-lock.json 的 vue 版本时发现对不上，就会重新构建依赖树
- 又因为 package.json 中的 vue 版本前面带 `^`，那么在规则允许的范围下，会下载最新的 vue2.6.12 版本，并且更新 package.json、package-lock.json 和 node_modules 中的 vue 版本



> 例3：存在 package-lock.json 的情况3

```js
// package.json

"dependencies": {
  "vue": "^2.2.0"
}


// package-lock.json
"dependencies": {
  "vue": {
    "version": "2.2.0",
    "resolved": "https://registry.npm.taobao.org/vue/download/vue-2.2.0.tgz",
    "integrity": "sha1-9FhpIM421TlEqyesUjbtkwOka0c="
  }
}
```

本来 package.json 和 package-lock.json 中的 vue 版本都是 2.2.0

但是如果手动将 package.json 中的 vue 版本降级，修改为 `"vue": "^2.1.0"`：

- 在对比 package.json 与 package-lock.json 的 vue 版本时发现对不上，就会重新构建依赖树
- 但是发现 2.1.0 不再允许的更新规则范围，那么依然会下载 vue2.2.0 版本，那么此时 package-lock.json 和 node_modules 中的 vue 是2.2.0 版本，package.json 中为手动修改的 2.1.0 版本。



**总结：**

- 如果想要手动升级或者降级某个包的版本，最好是使用 `npm i vue@2.6.12` 这种指定版本的方式，这种方式保证了 package.json、package-lock.json、node_modules 中的包版本符合指定要求和保证三者包版本的一致性。

- 在将代码放到 github 之类的代码仓库时，最好将 package-lock.json 一起上传，保证团队所有的小伙伴使用的都是统一版本的依赖包。



#### 6.2.2、package-lock.json 一些属性含义

```js
{
  "name": "npmpackage",
  "version": "1.0.0",
  "lockfileVersion": 1,
  "requires": true,
  "dependencies": {
    "axios": {
      "version": "0.21.1",
      "resolved": "https://registry.npm.taobao.org/axios/download/axios-0.21.1.tgz?cache=0&sync_timestamp=1608609215811&other_urls=https%3A%2F%2Fregistry.npm.taobao.org%2Faxios%2Fdownload%2Faxios-0.21.1.tgz",
      "integrity": "sha1-IlY0gZYvTWvemnbVFu8OXTwJsrg=",
      "requires": {
        "follow-redirects": "^1.10.0"
      }
    },
    "follow-redirects": {
      "version": "1.14.0",
      "resolved": "https://registry.nlark.com/follow-redirects/download/follow-redirects-1.14.0.tgz?cache=0&other_urls=https%3A%2F%2Fregistry.nlark.com%2Ffollow-redirects%2Fdownload%2Ffollow-redirects-1.14.0.tgz",
      "integrity": "sha1-9dJg+VxfjBBYlEkf7uXciZO0Av4="
    }
  }
}
```

- name：项目名称
- version：项目版本
- lockfileVersion：package-lock.json 文件版本
- requires：设置为 true 代表使用 require 来标记模块的依赖关系
- dependencies：项目所有的依赖：
  - 当前项目依赖 axios，axios 依赖 follow-redireacts，所以 follow-redireacts 在axios 的 require 里面
  - version：安装的 axios 的版本
  - resolved：记录下载的地址，也就是 axios 在 registry 仓库中的位置
  - integrity：用来从缓存中获取索引，再通过索引去获取压缩包文件
  - require：axios 还依赖于哪些模块



### 6.3、npm install 装包及其原理

在使用 `npm init` 初始化了 npm 环境时候，就可以使用 `npm install 包名` 的方式去安装第三方工具包了。



#### 6.3.1、npm install 装包

**使用方式：**

`npm install 包名` 或者使用缩写形式 `npm i 包名`



**安装全部依赖：**

```js
npm i
```

当 package.json 里面 devDependencies 和 dependencies  有依赖的时候，将被全部安装



**全局安装和项目局部安装：**

- 全局安装： `npm i xxx -g`
- 项目局部安装：`npm i xxx`

通常使用 npm 全局安装的包都是一些工具包，比如全局安装 yarn 工具

像 axios、express、koa 等在项目里面直接使用的库文件不能进行全局安装，原因：

- 多人合作项目，全局安装的包根本不会记录在 package.json 中，那到时候别人从代码仓库 clone 下来的项目就根本不知道使用了这个包
- 全局安装既然不记录在项目的 package.json 中，那么就代表着不会被安装到项目中的 node_modules 中，如果通过 require 引用了这个包，根据 Node 的 require() 函数的查找规则，根本在 node_modules 中找不到这个包，那么会报错：模块找不到



**--save-dev 和 --save**

```js
npm i xxx --save || npm i xxx -S

npm i xxx --save-dev  || npm i xxx -D
```

- --save-dev：简写 -D，代表安装到 package.json 下的 devDependencies中，一般是在开发阶段需要的包，但是在项目部署后是不需要的，会使用这个命令安装；例如： webpack、babel 等
- --save：简写 -S，代表安装到 package.json 下的 dependencies 中，用于生产和开发，在项目部署后仍然需要用到；例如：day.js、axios 等



如果直接使用 `npm i xxx`，后面既不带 -S，也不带 -D，那么安装的依赖默认会放到 dependencies  中



#### 6.3.2、npm install 原理

执行 `npm install` 的时候，将依赖包安装到了 node_modules 中，主要原理是：

![](/imgs/img17.png)

- 执行 `npm install`

- 检查 `.npmrc` 文件，判断有没有使用一些镜像源，比如淘宝镜像源等。

  - 查找 `.npmrc` 文件顺序：项目级的 `.npmrc` 文件 --> 用户级的 `.npmrc` 文件> 全局级的`.npmrc` 文件 > npm 内置的 `.npmrc` 文件

- 检查有没有 `package-lock.json` 文件

- 没有 `package-lock.json` 文件

  - 从 `npm` 远程仓库获取包信息（如果设置了镜像源，则是从镜像源中获取）

  - 根据 `package.json` 构建依赖树，过程是：

    - 构建依赖树时，不管其是直接依赖还是子依赖的依赖，优先将其拍平放置在 `node_modules` 根目录，**这就是扁平化**
    - 当遇到相同模块时（即同一个包可能被其他多个包所依赖），判断已放置在依赖树的模块版本是否符合这个相同模块的版本范围，如果符合则跳过，不符合则在当前模块的 `node_modules` 下放置该模块

    > 这一步仅仅是确定逻辑上的依赖树，并没有进行安装，后面会根据这个依赖结构去下载或拿到缓存中的依赖包

  - 在缓存中一次查找每个依赖树的包

    - 没有缓存
      - 从 npm 仓库下载包（或者从指定镜像源）
      - 检验包的完整性（用户下载依赖包到本地后，需要确定在下载过程中没有出现错误，所以在下载完成之后需要在本地在计算一次文件的 `hash` 值，如果两个 `hash` 值是相同的，则确保下载的依赖是完整的）
      - 完整性检验通过
        - 将下载的包复制到 `npm` 缓存目录
        - 将下载的包按照依赖结构解压到 `node_modules`
      - 完整性检验不通过，需要重新下载
    - 有缓存
      - 将缓存按照依赖结构解压到 `node_modules`

  - 将包解压到 `node_modules`

  - 生成 `package-lock.json` 文件

- 有 `package-lock.json` 文件

  - 检查 `package.json` 中的依赖版本是否和 `package-lock.json` 中的依赖是否有冲突
    - 有冲突，依次执行重新从远程仓库获取依赖包信息及后面流程
    - 没有冲突，检查缓存
      - 没有缓存，一次执行重新从远程仓库下载依赖包及后面流程
      - 有缓存，直接将缓存的包文件解压到 `node_modules`，后生成 `package-lock.json` 文件

- 最后完成安装



> 问题：为什么需要将 node_modules 中的包扁平化

其实，在 `npm` 的早期版本， `npm` 处理依赖的方式简单粗暴，以递归的形式，严格按照 `package.json` 结构以及子依赖包的 `package.json` 结构将依赖安装到他们各自的 `node_modules` 中。直到有子依赖包不在依赖其他模块。

但是这样子处理会带来很大的问题：

- 如果依赖的模块非常之多，那么 `node_modules` 将非常庞大，嵌套层级非常之深
- 在不同层级的依赖中，可能引用了同一个模块，导致大量冗余
- 在 `Windows` 系统中，文件路径最大长度为260个字符，嵌套层级过深可能导致不可预知的问题



### 6.4、其他一些常用 npm 命令

- 卸载某个依赖包：`npm uninstall 包名`

  ```js
  npm uninstall vue
  ```

- 清除缓存：`npm cache clean`

- 查看某个包的最新版本和所有版本

  - 查看最新版本： `npm view package version`
  - 查看所有版本：`npm view conard versions`

  ```js
  // 查看 vue 最新版本
  npm view vue version
  
  // 查看 vue 所有版本
  npm view vue versions
  ```

- 查看当前仓库依赖树上所有包的版本信息：`npm ls`

  ![](/imgs/img21.png)

- 查看哪些包没有升级到最新版本：`npm outdated`

  ![](/imgs/img22.png)

  可以看到当前项目的 vue 是 2.3.0 版本，最新的 vue2.x 是2.6.12 版本，没升级

- 查看当前镜像源：`npm config get registry`



更多的 npm 命令可以查看官方文档： https://docs.npmjs.com/cli-documentation/cli



### 6.5、yarn

yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具，推出时间为 2016 年

那时 `npm` 还处于 `V3` 版本时期，存在这非常多的缺点：比如说没有缓存、安装依赖速度慢、版本依赖混乱（树状地柜结构）等等一系列的问题。从 npm5 版本开始，对这些都进行了改进。



#### 6.5.1、使用 yarn 工具

要想使用 yarn 工具，就需要对其进行安装

```js
npm i yarn -g
```



为项目初始化一个 yarn 环境

```js
yarn init -y
```

执行玩之后也会生成一份 package.json 文件



安装依赖包，这里以 vue 为例

```js
yarn add vue
```

执行完命令，会将 vue 安装到 node_modules 中，并且在根目录多一份 yarn.lock 文件，用于锁定版本



`yarn add vue@2.2.0` 可以安装指定的 vue 版本



#### 6.5.2、常用命令与 npm 对比

| npm                       | yarn                   |
| ------------------------- | ---------------------- |
| npm install               | yarn install           |
| npm install package       | yarn add package       |
| npm install package -S    | yarn add package       |
| yarn add package -D       | yarn add package -D    |
| npm install package@x.y.z | yarn add package@x.y.z |
| npm uninstall package     | yarn remove package    |
| npm cache clean           | yarn cache clean       |
| npm outdated              | yarn outdated          |



### 6.6、nrm

因为上传到 npm 的包都是保存在 npm 的 registry 仓库中的，而这个仓库是在国外，国内可能会因为网络原因访问很慢或者下载失败。

而在国内，淘宝通过镜像连接 npm 的 registry 仓库，将 npm 仓库上的包放到国内的服务器上，大概每 10 分钟更新同步一次。



#### 6.6.1、给 npm 设置镜像源

查看当前 npm 镜像源：`npm config get registry`

直接将 npm 镜像源设置为 淘宝镜像源：`npm config set registry https://registry.npm.taobao.org`



#### 6.6.2、使用 nrm

nrm 可以帮助我们方便地切换不同的镜像源，包括 taobao、npm、yarn、cnpm 等



安装 nrm

```js
npm i nrm -g
```



查看 nrm 支持的镜像源：`nrm ls`

![](/imgs/img23.png)



可以看到支持：npm、yarn、cnpm、taobao 等，并且当前正在使用的是 taobao 镜像源



切换镜像源：`nrm use yarn`，切换完之后再执行 `nrm ls` 查看：可以看到镜像源已经切换

![](/imgs/img24.png)



或者使用 `npm current` 查看当前正在使用的镜像源



### 6.7、npx

npx 是 npm5.2 之后自带的一个命令。它有很多用处，但是比较常见的是使用它来调用项目中的某个模块的指令。



这里以 webpack 为例：

比如现在需要查看 webpack 的版本号，常规的方式是：

- 明确查找到 node_module 下面的 webpack

  ```js
  node ./node_modules/.bin/webpack --version
  ```

- 在 scripts 定义脚本，来执行 webpack

  ```js
  "scripts": {
    "webpack": "webpack --version"
  }
  ```



但是，有了 npx 后，可以：

```js
npx webpack --version
```

其实 npx 主要原理就是： **npx 会到当前目录的 `node_modules/.bin` 目录下查找对应的命令**。



## 7、Node 的 Buffer



### 7.1、了解二进制数据

在计算机中，所有的内容：文字、数字、图片、音频、视频等内容最终都是会使用二进制来表示。

对于前端而言，一般是很少去和二进制打交道的。比如就图片而言：无论是 html 还是 js，一般都是不直接操作图片的，只是告诉浏览器一个图片地址，浏览器负责获取这个图片，并且最终将这个图片渲染出来。

而图片是由一个个的像素点组成的，每个像素点又由很多而 rgb 或者其他组成，那么在计算机中怎么存储这些 rgb 呢？答案就是二进制。因为机器只能识别二进制数据。

对于前端而言，这些二进制的处理都交给了浏览器，因为 js更多的是直接去处理非常直观的数据：比如字符串，而对于二进制的处理，显得有点乏力（当然可以通过一些第三方库实现，但是毕竟不是本身的能力）



但是，对于服务器而言：服务器要处理的本地文件类型相对较多：

- 比如某一个保存文本的文件并不是使用 utf-8 进行编码的，而是用 GBK，那么就必须读取到文件的二进制数据，再通过 GKB 转换成对应的文字
- 比如需要读取的是一张图片数据（二进制），再通过某些手段对图片数据进行二次的处理（裁剪、格式转换、旋转、添加滤镜），Node中有一个 Sharp 的库，就是读取图片或者传入图片的 Buffer 对其再进行处理



所以如果需要使用 Node 开发服务端，那么就必须要有操作二进制的能力。因此，Node 提供了 Buffer 类。



### 7.2、Buffer

#### 7.2.1、buffer 与 二进制

buffer ：可以看成是存储二进制的一个数组，这个数组中的每一项，可以保存 8 位二进制： 00000000

一句话概括： `Buffer` 类是一个全局变量，用于直接处理二进制数据，提供工具类方法



>  为什么是 8 位?

在计算机中，一般很少直接操作一位二进制数据，因为一位二进制存储的数据是非常有限的；通常会将 8 位合在一起作为一个单元，这个单元称之为一个字节（byte）

也就是：1byte = 8bit，1kb = 1024 byte，1M = 1024kb



#### 7.2.2、buffer 基本使用

**通过 Buffer.from 创建 buffer：**

```js
const bufferStr = Buffer.from('gweid')
console.log(bufferStr) // <Buffer 67 77 65 69 64>
```

执行，可以看到输出的是：`<Buffer 67 77 65 69 64>`

上面不是说 buffer 存储的是二进制吗？现在怎么是十六进制？实际上 buffer 存储还是以二进制存储的，但是二进制是表示起来是 01000001 这样，太长，显示起来不方便看，所以显示的时候转换为十六进制方便阅读.



可以看到，对于英文字符串，一个英文只需要一个字节byte 就可以存储。如果对于中文呢？

```js
const bufferZh = Buffer.from('中国话')
console.log(bufferZh) // <Buffer e4 b8 ad e5 9b bd e8 af 9d>
```

输出的是 `<Buffer e4 b8 ad e5 9b bd e8 af 9d>`，总共九个字节，那么就是说明一个中文需要三个字节byte 来存储。当然，这个也不是确定的，因为在使用 buffer.form 的时候，如果没有传编码方式，默认就是 utf8 编码，utf8 编码就是：英文 1byte，中文 3byte



如果使用 `utf16le` 编码：

```js
const bufferZh = Buffer.from('中国话', 'utf16le')
console.log(bufferZh) // <Buffer 2d 4e fd 56 dd 8b
```

结果就不一样了，每个中文 2byte。但是，一般字符串编码使用 utf8



**将 buffer 解码还原**

```js
// 转换为 buffer，默认使用 utf8
const bufferZh = Buffer.from('中国话')
console.log(bufferZh)

// 对 buffer 进行解码，默认使用 utf8
console.log(bufferZh.toString())
```

解码 buffer 很简单，只需要使用 xxx.toString() 即可

但是要注意，转换为 buffer 的编码方式与还原的编码方式需要一致，比如上面的都使用呢 utf8。如果不一致会出现乱码问题。



**通过 Buffer.alloc 创建 buffer**

Buffer.alloc(size[, fill[, encoding]])

- `size`： 新 `Buffer` 的期望长度
- `fill`： 用于预填充新 `Buffer` 的值。默认使用  0
- `encoding`： 编码方式，默认 `utf8`

```js
const bufferStr = Buffer.alloc(4)
console.log(bufferStr) // <Buffer 00 00 00 00>
```

更改里面的某一项：

```js
const bufferStr = Buffer.alloc(4)

bufferStr[0] = 'w'.charCodeAt() // 字符串必须要通过 charCodeAt 转换
bufferStr[1] = 
bufferStr[2] = 0x66

console.log(bufferStr) // <Buffer 77 64 66 00>
```



其实，除了上面的两种 buffer 创建方式，还有很多 buffer 的创建方式，详细可以查看官方文档：https://nodejs.org/dist/latest-v14.x/docs/api/buffer.html



#### 7.2.3、buffer 文件读取

其实，通过 fs 读取文件，无论是文本、图片、音视频，都是以二进制也就是 buffer 的方式读取到的。

```js
const fs = require('fs')

fs.readFile('./a.txt', (err, data) => {
  console.log(data) // <Buffer 68 65 6c 6c 6f 2c 20 62 75 66 66 65 72>
})
```

对于文本，可以通过指定编码方式读取：

```js
const fs = require('fs')

fs.readFile('./a.txt', 'utf8', (err, data) => {
  console.log(data) // hello, buffer
})
```



同样，读取图片也是：

```js
const fs = require('fs')

fs.readFile('./img.png', (err, data) => {
  console.log(data)
})
```

图片读取到的也是 buffer，拿到这个图片 buffer，可以直接写入，也可以通过操作图片的 buffer 进行旋转、裁剪等一系列图片的操作

例如，这里借助 [sharp](https://github.com/lovell/sharp) 库进行图片裁剪

```js
const sharp = require('sharp')

sharp('./img.png')
  .resize(400, 300)
  .toFile('./img1.png')
```



#### 7.2.4、buffer 的内存分配

实际上在创建 Buffer 时，并不会频繁的向操作系统申请内存，而是会默认先申请一个8 * 1024 个字节大小的内存，也就是 8kb。后面如果不断使用 `Buffer.alloc` 创建，



可参考： [Node.js 中的缓冲区（Buffer）究竟是什么？](https://juejin.cn/post/6844903897438371847#heading-8)

