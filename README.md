# Node.js



## 1、Node.js 安装、版本工具

### 1.1、安装

Node 的安装非常简单，只需要在官网上下载对应平台的安装包安装即可



Node.js 官网： https://nodejs.org/en/



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

