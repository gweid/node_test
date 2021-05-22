Node 知识点：[Node](#node)

Express 知识点：[Express](#express)



# Node

**Node.js 官网：**

-  英文官网： https://nodejs.org/en/
- 中文官网：http://nodejs.cn/

node技术栈：https://www.nodejs.red/#/README



**利用 vscode 调试 Node：**

1. 打开需要调试的文件，在需要调试的地方打上断点：

   ![](/imgs/img46.png)

2. 打开 vscode 的 debugger 模式，注意，使用 debugger 模式要求当前被打开的文件不在启动状态

   ![](/imgs/img47.png)

3. 如果看到调试控制台输出如下，代表成功

   ![](/imgs/img48.png)



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

但是，由于 webpack 等工具可以实现对 CommonJs 或者 ES Module代码的转换，并且现代浏览器开始逐步支持 ES Moudle，AMD 和 CMD 其实已经很少使用了。更多的是在服务端使用 CommonJs，在浏览器端使用 es6 的模块化方案（低版本浏览器使用 webpack 转换）



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

这里只分析一些比较常用、重要的模块，其他的一些方法可以查看 Node 官方文档：https://nodejs.org/dist/latest-v14.x/docs/api/events.html



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
```



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



除了上面的，还有很多常用的 fs api，具体在需要使用到的时候，只需要查询文档即可：https://nodejs.org/dist/latest-v14.x/docs/api/fs.html



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



### 5.4、Buffer 模块

#### 5.4.1、二进制

在计算机中，所有的内容：文字、数字、图片、音频、视频等内容最终都是会使用二进制来表示。

对于前端而言，一般是很少去和二进制打交道的。比如就图片而言：无论是 html 还是 js，一般都是不直接操作图片的，只是告诉浏览器一个图片地址，浏览器负责获取这个图片，并且最终将这个图片渲染出来。

而图片是由一个个的像素点组成的，每个像素点又由很多而 rgb 或者其他组成，那么在计算机中怎么存储这些 rgb 呢？答案就是二进制。因为机器只能识别二进制数据。

对于前端而言，这些二进制的处理都交给了浏览器，因为 js更多的是直接去处理非常直观的数据：比如字符串，而对于二进制的处理，显得有点乏力（当然可以通过一些第三方库实现，但是毕竟不是本身的能力）



但是，对于服务器而言：服务器要处理的本地文件类型相对较多：

- 比如某一个保存文本的文件并不是使用 utf-8 进行编码的，而是用 GBK，那么就必须读取到文件的二进制数据，再通过 GKB 转换成对应的文字
- 比如需要读取的是一张图片数据（二进制），再通过某些手段对图片数据进行二次的处理（裁剪、格式转换、旋转、添加滤镜），Node中有一个 Sharp 的库，就是读取图片或者传入图片的 Buffer 对其再进行处理



所以如果需要使用 Node 开发服务端，那么就必须要有操作二进制的能力。因此，Node 提供了 Buffer 类。



#### 5.4.2、buffer 与 二进制

buffer ：可以看成是存储二进制的一个数组，这个数组中的每一项，可以保存 8 位二进制： 00000000

一句话概括： `Buffer` 类是一个全局变量，用于直接处理二进制数据，提供工具类方法



>  为什么是 8 位?

在计算机中，一般很少直接操作一位二进制数据，因为一位二进制存储的数据是非常有限的；通常会将 8 位合在一起作为一个单元，这个单元称之为一个字节（byte）

也就是：1byte = 8bit，1kb = 1024 byte，1M = 1024kb



#### 5.4.3、buffer 基本使用

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



#### 5.4.4、buffer 文件读取

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



#### 5.4.5、buffer 的内存分配

buffer 的内存分配采用了  slab 机制进行**预先申请、事后分配**。

slab 有三种状态：

- full：完全分配状态（内存占满）
- partial：部分分配状态（只使用了部分内存）
- empty：没有被分配状态（内存完全没有被用过）



事实上我们创建 Buffer 时，并不会频繁的向操作系统申请内存，它会默认先申请一个 8 * 1024 个字节大小的内存，也就是 8kb

> https://github.com/nodejs/node/blob/v14.16.1/lib/buffer.js#L136

```js
Buffer.poolSize = 8 * 1024;
let poolSize, poolOffset, allocPool;

// ...

function createPool() {
  poolSize = Buffer.poolSize;
  allocPool = createUnsafeBuffer(poolSize).buffer;
  markAsUntransferable(allocPool);
  poolOffset = 0;
}
createPool();
```

在加载 buffer 模块时，直接执行 createPool() 初始化一个 8kb 的内存空间，这也是**为什么说 Buffer 在创建时大小就已经被确定的且无法调整**；另外还声明了变量 **poolOffset** 用来**记录已经被使用的空间**

此时， slab 如下：

![](/imgs/img25.png)



通过 Buffer.alloc 分配一个 2048 字节的 buffer

```js
Buffer.alloc(2 * 1024)
```

那么 slab 会变为：

![](/imgs/img26.png)

具体的分配过程可以查看：

> https://github.com/nodejs/node/blob/v14.16.1/lib/buffer.js#L410

```js
function allocate(size) {
  if (size <= 0) {
    return new FastBuffer();
  }
    
  // 8096 右移 1 为 4096，即要分配的空间小于 4kb
  if (size < (Buffer.poolSize >>> 1)) {
    // slab 剩余空间不够分配， 通过 createPool 再申请一块 slab 的内存
    if (size > (poolSize - poolOffset))
      createPool();
      
    // 够分配那就直接分配，并且通过 poolOffset 记录当前已经使用的空间
    const b = new FastBuffer(allocPool, poolOffset, size);
    poolOffset += size;
    alignPool();
    return b;
  }
    
  // 要分配的空间大于 4kb，直接去创建新的 slab 内存
  return createUnsafeBuffer(size);
}
```



**buffer 内存分配总结：**

- 在初次加载时就会初始化 1 个 8KB 的内存空间 slab
- 根据申请的内存大小分为`小 Buffer 对象`和`大 Buffer 对象`
- 小 Buffer （小于 4kb ）情况，判断这个 slab 剩余空间是否足够容纳
  - 若足够就去使用剩余空间分配，并且记录下已经使用的内存空间
  - 若不足，执行 createPool 创建一个新的 slab 空间用来分配
- 大 Buffer 对象（大于 4kb ）情况，直接 createUnsafeBuffer(size) 创建

为什么要要判断区别大buffer对象还是小buffer对象？主要是因为不要每次创建小buffer对象时都去向系统申请内存调用。

不论是小 Buffer 对象还是大 Buffer 对象，内存分配是在 C++ 层面完成，内存管理在 JavaScript 层面，最终还是可以被 V8 的垃圾回收标记所回收，回收的是 Buffer 对象本身，堆外内存的那些部分只能交给 C++



可参考： [Node Buffer 对象的探究与内存分配代码挖掘](https://www.cnblogs.com/everlose/p/13054503.html)



### 5.5、Stream 模块

Stream 流：说到流，可能第一反应就是流水，源源不断地流动；在 Node 中流的概念也差不多，比如，从一个文件中读取内容时，文件的二进制（字节）数据会源源不断的被读取到，而这个一连串的字节，就是程序中的流。



因此，流在程序中可以理解为：是连续字节的一种表现形式和抽象概念；流应该是可读的，也是可写的。



为什么需要流呢？这里以读取文件和写入文件为例：在之前，读取文件使用 `fs.readFile`，写入文件用 `fs.writeFile`；但是这是完全读取和完全写入，就是说只能一次性读取（写入）所有的东西，这有个缺点就是无法控制一些细节的操作，比如从什么位置开始读、读到什么位置、一次性读取多少个字节、读到某个位置后暂停读取某个时刻恢复读取等等，亦或者文件非常大（例如视频），一次性全部读取并不合适。



#### 5.5.1、基本的 Stream 操作

**Node 中有 4 中基本流操作类型：**

- Readable：从中读取数据的流
- Writable：写入数据的流
- Duplex：同时读取和写入的流（一般用于 socket）
- Transform：在写入和读取数据时修改或转换数据的流



**下面以文件读写为例子，简述流的基本操作：**

使用 `fs.createReadStream` 创建一个文件读取流，先看看常用参数：

- path：要读取的文件，类型可以是 `<string>|<Buffer>|<URL>`

- options：配置参数，比较常用的是：

  - flags：以什么形式读取，默认是 `r`，仅读取

  - encoding：编码格式

  - start：文件读取开始的位置
  - end：文件读取结束的位置
  - highWaterMark：一次性读取字节的长度，默认 64KB
  - ......

文件读取流的基本使用：

```js
const fs = require('fs')

// 创建文件读取流
const readStream = fs.createReadStream('./test.txt', {
  encoding: 'utf8',
  highWaterMark: 10
})

// 监听文件被打开
readStream.on('open', () => {
  console.log('文件被打开');
})

// 监听流的读取
readStream.on('data', chunk => {
  console.log(chunk);

  // 暂停读取
  readStream.pause();

  // 500 毫秒之后恢复读取
  setTimeout(() => {
    readStream.resume();
  }, 500)
})

// 监听流文件读取结束
readStream.on('end', () => {
  console.log('读取结束');
})

// 读取错误
readStream.on('error', (err) => {
  console.log(err);
})

// 监听流文件关闭
readStream.on('end', () => {
  console.log('文件关闭');
})
```

为什么可以使用 `.on` 来监听事件呢？因为 **Stream 是继承自 Events 的**，那么就代表 Stream 有播报、监听事件的能力。



使用 `fs.createWriteStream` 创建写入流，下面来看看基本参数：

- path：要将流写入到哪里
- options: 配置参数，比较常用的是：
  - flags：以什么形式写入，默认是 `w`，会覆盖源文件，如果希望在文件末尾追加，可以使用 `a` 或者 `a+`
  - encoding：编码格式
  - start：开始写入的位置
  - ......

文件写入流：

```js
const fs = require('fs')

const content = 'There are moments in life when you miss someone so much'

// 创建写入流
const writeStream = fs.createWriteStream('./test1.txt', { flags: 'a+' })

// 写入内容
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
```

上面的 `writeStream.write` 写入加 `writeStream.close` 其实可以用一个代替：

```js
// writeStream.end 代表写入并关闭
writeStream.end(content, (err) => {
  if (!err) {
    console.log('写入成功');
  }
})
```

这里需要注意，写入流打开后是不会自动关闭的，需要手动调用 `.close` 进行关闭或者使用 `.end` 直接写入后关闭



**流读写操作：**先读取，再写入

```js
const fs = require('fs')

const readStream = fs.createReadStream('./test.txt', { highWaterMark: 10 })
const writeStream = fs.createWriteStream('./test1.txt', { flags: 'a+' })

readStream.on('data', chunk => {
  writeStream.write(chunk, err => {
    if (!err) {
      console.log('写入成功');
    }
  })
})
```



#### 5.5.2、管道流 pipe

**管道流：**

管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中

![](/imgs/img38.png)

把文件比作装水的桶，而水就是文件里的内容，我们用一根管子(pipe)连接两个桶使得水从一个桶流入另一个桶，这样就慢慢的实现了文件内容从一个文件到另外一个文件的过程。

```js
const fs = require('fs')

const readStream = fs.createReadStream('./test.txt')
const writeStream = fs.createWriteStream('./test1.txt')

readStream.pipe(writeStream)

writeStream.on('close', (err) => {
  console.log('读写完成');
})
```



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



### 6.8、发布自己开发的 npm 包

如果自己开发了一个 npm 包，想要共享出去，供团队或者其他人使用，那么就需要将开发的 npm 包发布到 npm registry 代码仓库上。

下面是发布一个 npm 包的流程。



#### 6.8.1、注册 npm 账号

要想发布 npm 包，首先得注册一个 npm 账号，用于管理自己发布的包。

npm 官网注册：https://www.npmjs.com/



#### 6.8.2、在本机登陆 npm

比如，进入到自己 npm 包项目根目录，执行 `npm login`

![](/imgs/img35.png)

输入刚刚注册的 npm 用户名、密码、邮箱地址，就会显示 `Logged in as weidu006 on https://registry.npmjs.org/.` 代表使用 weidu006 这个用户登陆了 `https://registry.npmjs.org/` 这个仓库，真正发布也是发布到 npm 的 registry 仓库上。



> 注意事项：一定要确保当前使用的 npm 镜像源是 npm，不能是 taobao 之类的镜像源



#### 6.8.3、修改 package.json

发布一个 npm 包需要关注的 package.json 属性：

- name：npm 包名，别人通过 npm 下载需要输入这个报名，全英文小写，中间可以加 `-` 分割

  - 注意，要想发布，包名必须是唯一的，也就是 npm 上不能存在相同的包名

- version：版本描述，一般遵循 semver 版本规范

- description：包描述，用户在 npm 上进行包搜索的会显示，有利于筛选

- keywords：关键词，在 npm 上可以通过关键词搜索到你的包

- author：包作者，一般格式为 `${your name}${email}`，也可以是 github 地址

- license：开源协议，目前使用的比较多的是 `MIT`

- homePage：包首页，如果在服务器上部署了包或者包的使用文档，可以填写这个

- repository：包源码地址，是一个对象形式：

  ```js
  "repository": {
    "type": "git", // 使用什么方式托管，git、svn 等
    "url": "https://github.com/ggBoy-caigou" // 源码地址
  }
  ```

- main：npm 包的入口



#### 6.3.4、添加描述文档 README.md

一般都会有一个描述文档，来说明当前 npm 包的使用方法

在根目录添加 `README.md` 文件



#### 6.3.5、支持多平台

如果当前的 npm 包想要支持多平台，比如浏览器、Node 等，那么就需要支持 cjs、es、amd 等引入，还有想代码压缩等，此时就需要使用到一些打包工具，例如常用的 rollup、webpack 等，将打包后的代码发布到 npm 即可。



#### 6.3.5、发布

执行命令：

```js
npm publish
```

出现如下：说明发布成功

![](/imgs/img36.png)

然后，就可以去 npm 上通过报名搜索，可能会有延迟，最好等个几分钟再搜索

![](/imgs/img37.png)





#### 6.3.6、更新 npm 包

1. 修改包代码
2. 更新 package.json 版本号（强烈建议遵循 semver 规范）
3. 重新发布



#### 6.3.7、删除 npm 包

执行命令：

```js
npm unpublish pagename --force
```

npm 官方认为，撤销发布的包被认为是一种不好的行为，试想一下你撤销了发布的包[假设它已经在社区内有了一定程度的影响]，这对那些已经深度使用并依赖你发布的包的团队是件多么崩溃的事情，所以更加推荐使用 `npm deprecate` 让 npm 包过期

而且，npm 官方 registry 仅支持删除72小时之内发布的包，超过时间需要联系支持邮件



#### 6.3.8、让发布的 npm 包过期

基本命令：

```js
 npm deprecate <pkg>[@<version>] <message>
```

- pkg：包名
- version：版本
- message：在任何人尝试安装这个包时的警告信息



使用这个命令，**并不会在社区里撤销你已有的包，但会在任何人尝试安装这个包的时候得到警告**



执行命令：

```js
npm deprecate weidu-npm-test@1.1.0 "当前以不维护"
```



## 7、事件循环Event Loop 与异步 IO

首先，理解事件循环是什么：事件循环可以理解 JavaScript 和浏览器或者 Node 之间的一个桥梁

- 浏览器的事件循环是 JavaScript 代码和浏览器 API 调用(setTimeout/AJAX/监听事件等)的一个桥梁，两者之间通过桥梁的回调函数进行沟通
- Node 的事件循环是 JavaScript 代码和系统调用（file system、network等）之间的一个桥梁，两者之间通过桥梁的回调函数进行沟通

![](/imgs/img27.png)



### 7.1、进程和线程

在说事件循环之前，先了解一下进程与线程



#### 7.1.1、进程与线程基本概念

进程：通俗地讲，可以认为启动一个应用程序，就会默认启动一个进程（也可能是多个进程）

线程：每一个进程中，都会启动一个线程用来执行程序中的代码，这个线程被称之为主线程，当然，除了诛仙程以外进程内还可以有其它的线程；所以，也可以说进程是线程的容器



下面以工厂为例，解析进程与线程关系：

- 操作系统类似于一个工厂
- 工厂中里有很多车间，这个车间就是进程
- 每个车间可能有一个以上的工人在做事，这个工人就是线程



#### 7.1.2、多进程与多线程开发

操作系统是如何做到同时让多个进程（听歌软件放歌、ide 写代码、浏览器查阅资料、...）同时工作呢?

- 这是因为 CPU 的运算速度非常快，它可以快速的在多个进程之间迅速的切换
- 当我们的进程中的线程获取获取到时间片时，就可以快速执行编写的代码
- 对于用户来说是感受不到这种快速的切换的

![](/imgs/img28.png)



### 7.2、javascript 和 浏览器

#### 7.2.1、javascript 单线程

- JS 语言的一大特色就是单线程，所谓单线程就是，**同一时间只能做一件事**。

- 为什么 JS 不能有多个线程呢？因为 JS 主要用途是与**用户进行交互以及操作DOM**。这就决定了它只能是单线程，否则假设有多个线程，一个线程在某个 DOM 节点上添加内容，同时另一个线程又要删除这个节点，这时浏览器该以谁为准呢



#### 7.2.2、浏览器多进程

- 目前多数的浏览器其实都是多进程的，当我们打开一个 tab 页面时就会开启一个新的进程，这是为了防止一个页面卡死而造成所有页面无法响应，整个浏览器需要强制退出。

- 每个进程中又有很多的线程，其中包括执行 JavaScript 代码的线程。



### 7.3、浏览器的事件循环 Event Loop

#### 7.3.1、同步和异步任务

JS是一门单线程语言，它有一个主线程（main thread）和调用栈（也叫执行栈call-stack），**所有的任务都会被放到调用栈等待主线程执行**。单线程就意味着所有任务需要排队，前一个任务结束，才执行下一个任务。但是如果前一个任务耗时很长，后一个任务就需要一直等着了。如果其中一个任务很慢，占用很多时间，此时网页就会卡住，比如网页请求操作。



所以 JS 语言的设计者意识到，主线程可以把等待中的任务挂起，先运行排在后面的任务。等到等待中任务返回结果后，再去执行挂起的任务。



因此任务可以分为两种，一种是**同步任务**，一种是**异步任务**：

- 同步任务：在主线程上排队执行的任务，只有前一个任务执行完毕，才执行下一个任务。

- 异步任务：不进入主线程，而是进入任务队列，通过 `Event Loop` 机制等待合适的时间调用。



#### 7.3.2、微任务与宏任务

异步任务细分为：微任务与宏任务。

在异步任务回调函数进入异步任务队列前会对这个异步任务进行判断看他是宏任务还是微任务，宏任务进入宏任务队列，微任务进入微任务队列。

在同步任务执行完成后，会先执行微任务队列的任务，直到微任务队列为空，再执行宏任务队列中的任务。也就是说：也就是宏任务执行之前，必须保证微任务队列是空的，如果不为空，那么会优先执行微任务队列中的任务。



浏览器常见的宏任务：setTimeout、setInterval、DOM 监听、ajax

浏览器常见的微任务：promise.then、Mutation Observer API



#### 7.3.3、浏览器的 Event Loop

整个流程：

![](/imgs/img29.png)



事件循环异步任务队列流程：

![](/imgs/img32.png)



**执行顺序：**

1. 在主线程上添加宏任务与微任务
   - 执行顺序：线程 => 主线程上创建的微任务 => 主线程上创建的宏任务
2. 在微任务中创建微任务
   - 执行顺序：主线程 => 主线程上创建的微任务1 => 微任务1上创建的微任务2 => 主线程上创建的宏任务
3. 微任务队列中创建的宏任务
   - 执行顺序：主线程 => 主线程上创建的微任务 => 主线程上创建的宏任务 => 微任务中创建的宏任务
4. 宏任务中创建微任务
   - 执行顺序：主线程 => 主线程上创建的微任务 => 主线程上的宏任务队列1 => 宏任务队列1中创建的微任务
5. async/await：分两种情况：
   - 马上实行 await 同一行后面的代码，当结果是一个变量，例如 await 'test'，那么直接把 await 后面的代码注册为微任务，然后跳出 async 函数，执行后面代码
   - 马上实行 await 同一行后面的代码，当结果是一个异步函数调用，那么根据异步函数类型将其放到宏任务或者微任务，此时并不会马上将 await 后面的代码注册为微任务，而是先跳出 async 函数，执行后面代码，最后把 await 后面的代码注册为微任务



**例子1：**

```js
console.log('同步任务--1');

setTimeout(() => {
  console.log('setTimeout--1');
})

const p = new Promise((resolve, reject) => {
  console.log('promise--1');
  resolve();
})

p.then(() => {
  console.log('promise.then--1')

  setTimeout(() => {
    console.log('setTimeout--2');

    p.then(() => {
      console.log('promise.then--2');
    })
  })

  p.then(() => {
    console.log('promise.then--3');
  })
})

p.then(() => {
  console.log('promise.then--4')
})

setTimeout(() => {
  console.log('setTimeout--3')

  p.then(() => {
    console.log('promise.then--5');
  })
})
```

结果是：

```js
// 输出结果：
//   同步任务--1
//   promise--1
//   promise.then--1
//   promise.then--4
//   promise.then--3
//   setTimeout--1
//   setTimeout--3
//   promise.then--5
//   setTimeout--2
//   promise.then--2
```



**例子2：async/await第一种情况：**

```js
async function asyncFun1() {
  console.log('asyncFun1--start');
  await asyncFun2();
  console.log('asyncFun1--end');
}

async function asyncFun2() {
  console.log('asyncFun2');
}

console.log('script--1');

setTimeout(() => {
  console.log('setTimeout');
})

asyncFun1();

new Promise((resolve) => {
  console.log('promise--1');
  resolve()
}).then(res => {
  console.log('promise.then--2');
})

console.log('script--2');
```

输出结果：

```js
// script--1
// asyncFun1--start
// asyncFun2
// promise--1
// script--2
// asyncFun1--end
// promise.then--2
// setTimeout
```



**例子3：async/await第二种情况：**

```js
async function asyncFun1() {
  console.log('asyncFun1--start');
  await asyncFun2();
  console.log('asyncFun1--end');
}

async function asyncFun2() {
  console.log('asyncFun2');

  return new Promise((resolve) => {
    resolve()
  }).then(res => {
    console.log('promise.then--1');
  })
}

console.log('script--1');

setTimeout(() => {
  console.log('setTimeout');
})

asyncFun1();

new Promise((resolve) => {
  console.log('promise--1');
  resolve()
}).then(res => {
  console.log('promise.then--2');
})

console.log('script--2');
```

输出结果：

```js
// script--1
// asyncFun1--start
// asyncFun2
// promise--1
// script--2
// promise.then--1
// promise.then--2
// asyncFun1--end
// setTimeout
```



### 7.4、Node 中的事件循环 Event Loop

浏览器的 Event Loop 是根据 html5 规范来实现的,不同浏览器的实现方式可能有差异。

在 Node 中，由 libuv 实现 eventloop。先来回忆一下 Node 流程图：

![](/imgs/img7.png)

可以发现，libuv 中主要维护了一个 EventLoop 和 worker threads（线程池），在 Node 中真正与操作系统进行沟通的是 libuv；比如说，需要 fs 去打开文件，js 代码经过 v8 引擎解析，通过 Bindings 桥梁告诉 libuv，然后再由 libuv 与操作系统进行沟通



#### 7.4.1、阻塞与非阻塞 I/O

假设当前程序中需要对一个文件进行操作，那么就需要打开这个文件，而任何程序中的文件操作都需要**调用操作系统的文件系统**，这个文件操作，就可以认为是 I/O 操作（I/O 是 Input/Ouput 的缩写，即输入输出）。



操作系统为我们提供了阻塞式调用和非阻塞式调用：

- 阻塞式调用（阻塞 I/O）：调用结果返回之前，当前线程处于阻塞态（阻塞态 CPU 是不会分配时间片的），调用线程只有在得到调用结果之后才会继续执行。
- 非阻塞式调用（非阻塞 I/O）： 调用执行之后，当前线程不会停止执行，只需要每隔一段时间来检查一下有没有结果返回即可。



就目前而言，更多的是使用非阻塞调用，不需要傻傻等待结果，浪费 CPU 资源。



**非阻塞 I/O 存在的问题：**

假设读取文件，非阻塞 I/O 并没有一次性读取到结果，这就意味着为了可以知道是否读取到了完整的数据，需要频繁的去确定读取到的数据是否是完整的，就是一个**轮询**的过程。并且开发中我们可能不只是一个文件的读写，可能是多个文件，或者是多个功能：网络的IO、数据库的IO、子进程调用。如果使用**主线程**程频繁的去进行轮询的工作，那么必然会大大降低性能。

基于以上，可以得出结论：结果是必须要拿到的，但是不能让主线程去轮询。



为了解决这个轮询问题，libuv 提供了一个线程池（Thread Pool）：线程池会负责这些相关的 I/O 操作，并且会通过轮询等方式等待结果。比如上面的读取 I/O 操作，就可以从线程池拿出一个线程来执行，并且在这个线程中轮询等待结果。（一开始，libuv 线程池默认创建 4 个线程，线程池最大线程数是 128）

那么当读取到结果，又是怎么通知 javascript 呢？这时就需要 Event Loop 了。读取到结果，将结果连同之前注册的回调函数一起放进事件循环中的**某一个队列**（事件循环有很多队列，并不止一个）中，事件循环就可以通知 javascript 应用程序执行对应的回调函数（此时，可以回头看一下上面的 Node 流程图）

```js
// 后面的就是注册的回调函数
fs.readFile('xxx.txt', 'utf8', (err, data) => {})
```



#### 7.4.2、阻塞、非阻塞、同步、异步

**阻塞和非阻塞：**一般是对于**被调用者**来说，比如说在 Node 中，更多的是指**系统调用**，系统提供了阻塞和非阻塞调用两种方式。

**同步和异步：**一般是对于**调用者**来说，在 Node 中，更多是指 javascript 调用：

- 在发起 javacsript 调用之后，不会进行其他任何的操作，只是等待结果，这个过程就称之为同步
- 发起调用之后，并不会等待结果，继续完成其他的工作，等到有回调时再去执行，这个过程就是异步



对于 libuv，一般采用**异步非阻塞I/O** 的方式调用。



#### 7.4.3、线程池

目前的服务器端语言中存在着什么问题？在 Java、php 或 ASP.NET 等服务器端语言中，每一个客户端连接需要创建一个新的线程，而每个线程需要耗费大约 2MB 的内存，也就是说，理论上，具有8GB内存的服务器可以同时连接的最大用户数大约为 4000 个左右，如果需要支持更多用户就需要增加服务器数量。

这样子一个用户创建一个线程肯定是不太合理的，特别是在高并发情况下，一次有上百万个请求进来怎么办？而且创建了那么多线程，在这一系列请求结束后，这些线程是不是又要被销毁，线程创建最直观的开销就是**内存**，这样的频繁创建和销毁对性能的影响显而易见，同时这样的设计并不能撑其瞬时**峰值流量**。



基于以上问题，线程池应运而生：

对于频繁的线程创建销毁，解决的办法就是线程复用：

- 一个线程被创建之后，即使这一次响应结束了，也不让他被回收，下一次请求来的时候依然让他去处理。
- 那么怎么保证线程不被回收？Node 中是通过写一个**死循环**来解决，线程一直处于循环中，当有请求来的时候处理请求，当没有的时候就一直等待，等到了再执行处理，处理完再等待，反复横跳，无限循环。
- 处于死循环中的线程怎么知道啥时候有请求要给他处理？当没有任务的时候，所有线程处于阻塞状态，当任务来的时候，空闲线程去竞争这个任务，取到的线程开始执行，未取到的继续阻塞。



#### 7.4.4、Event Loop

无论是我们的文件IO、数据库、网络IO、定时器、子进程，在完成对应的操作后，都会将对应的结果和回调函数放到事件循环（任务队列）中，事件循环会不断的从任务队列中取出对应的事件（回调函数）来执行。



**Node 的宏任务和微任务：**

Node 中事件循环的异步队列任务也分两种：宏任务和微任务

- 宏任务：setTimeout、setInterval、 setImmediate、I/O 操作
- 微任务：promise.then、process.nextTick



**Node 的 event loop 六个阶段：**

一次完整的事件循环会分为很多个阶段，先来看看官方文档关于 event loop 的图：

![](/imgs/img31.png)

- timers（定时器）：本阶段执行已经被 `setTimeout()` 和 `setInterval()` 的调度回调函数，简单理解，就是这两个函数的回调函数执行
- pending callbacks（待定回调）：本阶段执行某些系统操作（比如 TCP 错误类型）的回调函数
- idle, prepare：仅系统内部使用（这里只需要知道有这两个阶段就行）
- poll（轮询）：检索新的 I/O 事件，执行与 I/O 相关的回调，其余情况 node 将在适当的时候在此阻塞。这是最复杂的一个阶段，所有的事件循环以及回调处理都在这个阶段执行
- check（检测）：setImmediate() 回调函数在这里执行
- close callbacks（关闭的回调函数）：一些关闭的回调函数，如：socket.on('close', ...)

> 注意：这六个阶段并不包含 process.nextTick



**Node 的 event loop 的三大重要阶段：**

日常开发中的绝大部分异步任务都是在 timers、poll、check 这3个阶段处理的，接下来重点看看这三大阶段：

- timers：timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。 **在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行**

- poll：poll 是一个至关重要的阶段，这一阶段中的执行逻辑如下：

  ![](/imgs/img33.png)

  当前已经存在定时器，而且**定时器到时间了**，拿出来执行，eventLoop 将回到 timers 阶段

  如果没有定时器, 会发生以下两件事情:

  - 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
  - 如果 poll 队列为空：
    - 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
    - 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去,一段时间后自动进入 check 阶段

- check：直接执行 setImmdiate 的回调



**process.nextTick：**

process.nextTick 其实是独立于 eventLoop 的任务队列，它有一个自己的队列。process.nextTick 的执行时机会因为 Node 版本的不一致有一点差异。

process.nextTick 的执行优先级高于 promise.then



**Node 版本差异：**

- **timers 阶段：**如下面一段代码：

  ```js
  setTimeout(()=>{
    console.log('setTimeout--1')
    Promise.resolve().then(function() {
      console.log('promise.then--1')
    })
  })
  
  setTimeout(()=>{
    console.log('setTimeout--2')
    Promise.resolve().then(function() {
      console.log('promise.then--2')
    })
  })
  ```

  - 在 Node11 及之后的版本，执行一个阶段里的一个宏任务之后会把这个宏任务创建的微任务执行，这就跟浏览器端运行一致，最后的结果为：`setTimeout--1=>promise.then--1=>setTimeout--2=>promise.then--2`
  - 在 Node10 及更低版本，会先执行完 timers 阶段的宏任务，等到 timers 阶段结束再执行微任务，结果是：`setTimeout--1=>setTimeout--2=>promise.then--1=>promise.then--2`

- **check 阶段：**如下面一段代码

  ```js
  setImmediate(() => console.log('immediate--1'));
  setImmediate(() => {
    console.log('immediate--2');
    Promise.resolve().then(() => console.log('promise.then'));
  });
  setImmediate(() => console.log('immediate--3'));
  ```

  - 在 Node11 及之后的版本，结果是：`immediate--1=>immediate--2=>promise.then=>immediate--3`
  - 在 Node10 及更低版本，结果是：`immediate--1=>immediate--2=>immediate--3=>promise.then`

- **process.nextTick：**如下一段代码：

  ```js
  setImmediate(() => console.log('setImmediate--1'));
  setImmediate(() => {
    console.log('setImmediate--2');
    process.nextTick(() => console.log('nextTick'));
  });
  setImmediate(() => console.log('setImmediate--3'));
  ```

  - 在 Node11 及之后的版本，结果是：`setImmediate--1=>setImmediate--2=>nextTick=>setImmediate--3`
  - 在 Node10 及更低版本，结果是：`setImmediate--1=>setImmediate--2=>nextTick=>setImmediate--3`

也就是说，在 Node11 及之后的版本，很多特性已经向浏览器看齐了。



**setTimeout(fn, 0)、setImmediate(fn)执行顺序分析：**

看如下一段代码：

```js
setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});
```

使用 Node 执行的时候，会发现输出顺序是不确定的。为什么呢？在 Node 中，setTimeout 的延时时间如果不传或者传 0 都会被转换为 1ms；而事件循环的初始化是需要时间的，如果初始化时间大于 1ms，那么此时进入到 poll 阶段，那么肯定是存在 setTimeout 定时器并且时间到了，那么会执行 setTimeout ；如果而事件循环的初始化时间小于 1ms，那么此时进入 poll 阶段，没检测到定时器，那么就会去 check 阶段执行 setImmediate。



再看如果是在 I/O 事件中：

```js
fs.readFile('./test.txt', 'utf8', (err, data) => {
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);

  setImmediate(() => {
    console.log('setImmediate');
  });
})
```

那么必然是先输出 setImmediate 再输出 setTimeout。为什么？前面说过，在 Node 中，setTimeout 的延时时间如果不传或者传 0 都会被转换为 1ms；但是此时，事件循环已经被初始化过了，执行完 fs.readFile 之后setTimeout  要 1ms 之后，此时 poll 队列为空，就会去 check 阶段执行 setImmediate



**大体上 Node 的 Event Loop 的执行流程如下：**

![](/imgs/img34.png)



**例子分析：**

```js
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
```

结果是：

```js
start
end
promise.then--2
setTimeout--1
nextTick--1
promise.then--1
setTimeout--2
setImmediate--1
readFile--1
nextTick--2
```

这里可能会问：根据上面的图，不是 poll 执行 I/O 之后再执行 check 的 setImmediate 吗，为什么 setImmediate 会在 fs 操作之前呢？

因为，在 fs 进行文件读取的时候是耗时的，在读取过程中并没有将 fs 的回调放进 poll 队列，那么 poll 为空，就会进入 check 执行 setImmediate；等到 fs 读取完成，将回调放进 poll 队列，再执行 fs 回调。



#### 7.4.5、线程池 + Event Loop 实现异步非阻塞 I/O

下面来了解 Node 中使用线程池 + Event Loop 实现异步非阻塞 I/O，先来看一张图：

![](/imgs/img30.png)



基本实现：以 `fs.readFile` 为例：

```js
fs.readFile('xxx.txt', 'utf8', (err, data) => {})
```

- **实现非阻塞：**要想实现非阻塞，那么肯定不能由主线程去处理，那么就交由线程池处理，主线程就可以继续做其他的事情。
- **实现异步：**在线程池 IO 处理结束后，会主动的把结果和之前注册的回调函数放入 eventloop 任务队列中，eventloop 处于不断循环的状态，当循环检查到任务队列里有东西时，就会取出来然后执行。

也就是说，当发起一个 I/O 请求的时候，主线程无需等待这个 I/O 请求的结果返回，而是直接交给线程池去处理，线程池处理完结果后，会将结果及之前注册的回调放入 **eventloop 某一个任务队列**（事件循环有很多队列，并不止一个）中，eventloop 会不断的从任务队列中取出对应的事件（回调函数）来执行。整个 IO 过程**对主线程而言非阻塞**，并且拿到结果后自动执行回调，达到异步非阻塞。



**问题：Node 需要考虑线程安全的问题吗？**

首先，了解什么是线程安全：例如，在 java 中，对于同一块内存空间，一个线程在读取，一个线程在写入，那么肯定会有问题，这时候就需要考虑线程安全的问题。

而在 Node 中，拿到结果后，将之前注册过的回调函数放进任务队列，eventloop 会不断的从任务队列中取出对应的事件（回调函数），交给 javascript 执行，而 javascript 是单线程的，每次只能执行一件事。所以 Node 中是不会存在线程安全的问题。

但是如果都是异步非阻塞操作，Node 中会存在执行先后顺序不一样的问题，这个取决于线程池对某一 I/O 操作处理的快慢。



## 8、HTTP

模拟请求可以使用 apifox、postman 等工具



### 8.1、web 服务器

当客户端需要某一个资源时，可以通过 Http 请求向一台服务器获取到这个资源；提供资源的这个服务器，就是一个 Web 服务器。

![](/imgs/img39.png)

目前，常见的 web 服务器有：IIS、Nginx、Apache、Tomcat、Node.js 等



### 8.2、Node 启动一个 web 服务器

Node 创建一个 web 服务器主要是依赖于 http 模块：

```js
const http = require('http')

// 端口号
const HTTP_PORT = 9000
// host 地址
const HTTP_HOST = '0.0.0.0'

// 创建一个服务器
const server = http.createServer((req, res) => {
  res.end('server success')
})

// 启动服务器，指定端口号和主机地址
server.listen(HTTP_PORT, HTTP_HOST, () => {
  console.log(`服务器已启动：${HTTP_HOST}:${HTTP_PORT}`)
})
```

Node 执行文件，打开 127.0.0.1:9000 会发现输出了 `server success`，这就代表成功启动了一个 web 服务器

![](/imgs/img40.png)



### 8.3、nodemon 的使用

如果只是使用 node 去执行文件，那么每修改一次文件都需要重新执行一次，太过麻烦，所以一般使用 `nodemon` 工具去监听文件变化，自动重启服务器

全局安装：

```js
npm i nodemon -g
```

使用：

```js
nodemon index.js
```



### 8.4、创建服务器的方式

在上面的例子中，创建服务器是通过 `http.createServer` 的方式

其实还可以通过另外一种方式创建：`new http.Server`

```js
const http = require('http')

const server2 = new http.Server((req, res) => {
  res.end('new http.Server')
})

server2.listen(9001, () => {
  console.log(`服务器已启动：0.0.0.0:9001`);
})
```

这两种创建服务器的方式有什么不一样呢？其实本质是完全一样的，下面来看一段 Node 源码:

![](/imgs/img41.png)

可以发现，`createServer` 实际上就是 `new Server` 而已



### 8.5、主机和端口号

**Server** 通过 listen 方法来开启服务器，并且在某一个主机和端口上监听网络请求

listen 常用的参数是三个：

- port：端口号，可以不传，不传系统会自动分配端口号，但是开发中一般会指定端口号

  - 不传端口号的时候，可以怎么知道系统分配的端口号呢？

    ```js
    server.listen(() => {
      const HTTP_PORT = server.address().port
      console.log(`服务器已启动：0.0.0.0:${HTTP_PORT}`)
    })
    ```

- host：主机，一般可以传入：localhost、127.0.0.1、0.0.0.0，不传默认是 0.0.0.0

  - localhost：本质上是一个域名，通常情况下被解析成 127.0.0.1
  - 127.0.0.1：是一个回环地址，主机自己发出去的包，直接被自己接收
    - 正常的数据库包经过 `应用层 - 传输层 - 网络层 - 数据链路层 - 物理层`
    - 而回环地址，在网络层就被直接获取了，并没有经过 `数据链路层 - 物理层`
    - 所以，在监听 127.0.0.1 的时候，在同一网段下的主机中，通过主机 ip 地址是不能访问的。比如当前主机 ip 地址：`192.168.0.11`，那么通过这个是不能访问的
  - 0.0.0.0：监听 IPV4 上的所有地址，再根据端口找到不同的应用程序；当监听 0.0.0.0时，在同一个网段下的主机中，通过主机 ip 地址是可以访问的（所以比较常用的是 0.0.0.0，默认就是这个）

  当然，像 localhost 和 127.0.0.1 也可以通过修改电脑 host 文件映射到其他地址

- 回调函数：服务器启动成功时的回调函数



### 8.6、request 对象

```js
const server = http.createServer((req, res) => {})
```

request 对象中封装了所有客户端传给服务端的信息，比如：请求的 url、请求方法 method、请求头 headers 等

```js
const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.url)
  console.log(req.method)
  console.log(req.headers)

  res.end('server success')
})

server.listen(9000, () => {
  console.log('服务已启动: 0.0.0.0:9000')
})
```

当访问 `0.0.0.0:9000` 的时候，控制台会输出：

![](/imgs/img42.png)

- url：服务端根据请求的 url 不同进行不同的处理
- method：请求方式：get、post、put、patch、delete 等
- headres：请求头信息：比如客户端信息、接受数据的格式、支持的编码格式、或者 token 等
- ......

一般比较常用的就是上面三个



#### 8.6.1、request 对象 url 的处理

根据传入的 url 不同，进行不同的处理

```js
const http = require('http')

const server = http.createServer((req, res) => {
  const reqUrl = req.url
  if (reqUrl === '/login') {
    res.end('login successs')
  } else if (['/', '/home'].includes(reqUrl)) {
    res.end('homePage')
  } else {
    res.end('404 not found')
  }
})

server.listen(9000, () => {
  console.log('服务已启动: 0.0.0.0:9000')
})
```



#### 8.6.2、带参数的 url 解析

例如： `http://127.0.0.1:9000/home?id=1257&name=jack`

这种，直接通过 request.url 得到的是： `/home?id=1257&name=jack`，那么就需要使用 Node 的内置模块 url 来解决

```js
const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const urlRes = url.parse(req.url)
  console.log(urlRes);
})

server.listen(9000, () => {
  console.log('服务已启动: 0.0.0.0:9000')
})
```

会输出：

![](/imgs/img43.png)

那么就可以通过 pathname 拿到 url，通过 query 拿到参数



但是此时拿到的 query 参数是一个字符串，现在肯定是希望这是一个对象形式，那么可以自己封装函数转换为对象形式，可以使用 Node 内置模块 `querystring`，也可以使用第三方库 `qs`

- 使用 Node 内置模块 querystring

  ```js
  const http = require('http')
  const url = require('url')
  const querystring = require('querystring')
  
  const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url)
    const queryObj = querystring.parse(query)
  })
  ```

- 使用第三方库 qs

  - 安装 qs

    ```js
    npm i qs
    ```

  - 使用：

    ```js
    const http = require('http')
    const url = require('url')
    const qs = require('qs')
    
    const server = http.createServer((req, res) => {
      const { pathname, query } = url.parse(req.url)
      const queryObj = qs.parse(query)
    })
    ```



#### 8.6.3、处理 POST 请求参数

```js
const http = require('http')

const server = http.createServer((req, res) => {
  const { method: reqMethod, url: reqUrl } = req

  if (reqUrl === '/login' && reqMethod === 'POST') {
    let data = ''
    
    // 接收参数
    req.on('data', chunk => {
      data += chunk
    })

    req.on('end', () => {
      // 先将 buffer 转换为字符串，再将字符串转换为对象
      const body = JSON.parse(data.toString())
      console.log(body)

      res.end('server success')
    })
  }
})
```

- 需要 `req.on` 去接收参数
- 接受到的参数是 `buffer` 形式，使用 `toString()` 转换为 字符串形式，再使用 `JSON.parse` 转换为对象



#### 8.6.4、Restful 规范

在 Restful 规范（设计风格）中，对于数据的增删改查应该通过不同的请求方式：

- GET：查询数据
- POST：新增数据
- PATCH：修改数据
- DELETE：删除数据



#### 8.6.5、rqeuest 对象的 headers

基础的 headers 中包含：

```js
{
  'user-agent': 'apifox/1.0.0 (https://www.apifox.cn)',
  'content-type': 'application/json',
  accept: '*/*',
  'cache-control': 'no-cache',
  host: '127.0.0.1:9000',
  'accept-encoding': 'gzip, deflate, br',
  connection: 'keep-alive',
  'content-length': '45'
}
```

- user-agent：客户端相关信息

- content-type：当前请求携带数据的类型

  - 常见的媒体格式类型如下：
    - text/html ： HTML 格式
    - text/plain ：纯文本格式
    - text/xml ： XML 格式
    - image/gif ：gif 图片格式
    - image/jpeg ：jpg 图片格式
    - image/png：png 图片格式
  - 常见的 application 开头的媒体格式类型：
    - application/xml： XML 数据格式
    - application/pdf：PDF 格式
    - application/msword ： Word 文档格式
    - application/json： JSON 数据格式
    - application/x-www-form-urlencoded ：以 `name=jack&age=28` 形式传到服务器
  - 上传文件之时使用的：
    - multipart/form-data ： 文件上传时，需要使用该格式

- accept：告知服务器，客户端可接受文件的格式类型

- cache-control：缓存相关

- accept-encoding：告知服务器，客户端支持的文件压缩格式，比如 gzip 压缩（效率可达到40%-60%），对应 .gz文件

- connection：值为 keep-alive 表示：

  - 首先 http 是基于 tcp 协议的（http 是应用层协议，tcp 是传输层协议），通常在进行一次请求和响应结束后会立刻中断连接
  - 在 http1.0中，如果想要继续保持连接：
    - 浏览器需要在请求头中添加 connection: keep-alive
    - 服务端需要在响应头中加 connection: keep-alive
    - 当客户端再次发起请求时，就会使用同一个连接，直接一方中断连接
  - 在 http1.1 中，默认开启 keep-alive，不同的 Web 服务器会有不同的保持 keep-alive 的时间，Node 中是 5s（服务端一直保持长连接压力是非常大的，特别是有很多客户端与服务端保持长连接）

  使用 keep-alive 的好处是：建立 tcp 连接是要经过三次握手，是非常耗时的，而保持连接，减少 tcp 创建时间

- content-length：文件的大小和长度



### 8.7、response 对象

Node 服务端想要给客户端返回的东西都封装在 response 对象中。



#### 8.7.1、响应结果

要想给客户端响应的结果数据，可以通过两种方式：

- res.write：直接输出响应结果，但是并没有关闭流
- res.end：
  - 传参数，输出最后数据，并且关闭流，例如： `res.end('success')`
  - 不传参数，关闭流，例如： `res.end()`

如果输出没有调用 end，客户端将会一直等待结果，所以客户端在发送网络请求时，都会设置超时时间

```js
const http = require('http')

const server = http.createServer((req, res) => {
  // 使用 write 输出结果
//   res.write('write')
//   res.end()

  res.end('server success')
})

server.listen(9000, () => {
  console.log('服务已启动: 0.0.0.0:9000')
})
```



#### 8.7.2、响应状态码

**这里列出一些常用的状态码：**

| 状态码 | 状态描述              | 说明                                                         |
| ------ | --------------------- | ------------------------------------------------------------ |
| 200    | OK                    | 客户端请求成功                                               |
| 301    | Moved Permanently     | 永久重定向                                                   |
| 302    | Found                 | 临时重定向                                                   |
| 304    | Not Modified          | 资源缓存                                                     |
| 400    | Bad Reque             | 客户端请求有语法错误，服务器无法理解                         |
| 401    | Unauthorized          | 请求未经授权，要求用户的身份认证                             |
| 403    | Forbidden             | 服务器收到请求，但是拒绝提供服务                             |
| 404    | Not Found             | 请求的资源不存在                                             |
| 500    | Internal Server Error | 服务器内部错误，无法完成客户端请求                           |
| 503    | Service Unavailable   | 当前服务器暂时无法处理客户端请求，一段时间后，服务端可能恢复正常 |

更多的状态码，可以参考：https://www.runoob.com/http/http-status-codes.html



**Node 中设置状态码的两种方式：**

- 通过 `res.statusCode`

  ```js
  const server = http.createServer((req, res) => {
    res.statusCode = 400
    res.end('server success')
  })
  ```

- 通过 `res.writeHead`

  ```js
  const server = http.createServer((req, res) => {
    res.writeHead(400)
    res.end('server success')
  })
  ```

  

#### 8.7.3、响应头文件

设置响应头文件的方式也有两种：

- res.setHeader：一次只能设置一个 header 信息

  ```js
  const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'application/json;charset=utf8')
  
    res.end('server')
  })
  ```

- res.writeHead：同时写入 header 和 status，并且一次可以设置多个 header 信息

  ```js
  const server = http.createServer((req, res) => {
    res.writeHead(200, {
      'content-type': 'application/json;charset=utf8'
    })
    res.end('server')
  })
  ```



设置 content-type 的作用：可以让客户端会按照 content-type 方式对返回字符串进行处理，例如：

- 设置 content-type 为 application/json

  ![](/imgs/img45.png)

- 设置 content-type 为 text/html

![](/imgs/img44.png)

很明显，设置 content-type 为 text/html 被浏览器当做标签解析了。服务端渲染就可以设置这个



### 8.8、Node 利用 http 发送网络请求

Node.js 既可以开发 web 服务器，可以了发送网络请求，这两种能力都由 http 模块提供。

这也是为什么 Node 可以作为中间层代理的原因之一。

还有为什么 axios 即可以在浏览器中使用，也可以在 Node 中使用：

- axios 在浏览器中是用 xhr 发起请求
- 在 Node 中是利用 http 模块发起请求



接下来看看 http 模块发送请求的能力：

首先，有一个 Node 服务器：

```js
const http = require('http')

const server = http.createServer((req, res) => {
  res.end('server success')
})

server.listen(9000, () => {
  console.log('服务已启动: 0.0.0.0:9000')
})
```

然后是利用 http 模块发起请求：

- get 请求：

  ```js
  const http = require('http')
  
  // 发起 get 请求
  http.get('http://localhost:9000', res => {
    res.on('data', chunk => {
      console.log(chunk.toString())
    })
  })
  ```

- 其它请求：

  ```js
  const http = require('http')
  
  // 发起请求（注意，http 发起所有请求都可以通过 http.request）
  const request = http.request({
    method: 'POST',
    hostname: 'localhost',
    port: 9000
  }, res => {
    res.on('data', chunk => {
      console.log(chunk.toString())
    })
  })
  
  // 必须要 end，代表请求相关配置已准备好，可以发送请求
  request.end()
  ```





# Express

在 Node 中，可以基于 Express 框架快速、方便的开发自己的 Web 服务器，并且可以通过一些实用工具和中间件来扩展自己功能。

**Express 官网：**

- 中文官网：http://expressjs.com/zh-cn/

- 英文官网：https://expressjs.com/



## 1、安装 express

安装 express 一般有两种方法：

- 通过 npm 安装 express
- 通过 express 脚手架直接创建一个应用骨架



### 1.1、npm 安装

1. 初始化一个 npm 环境

   ```js
   npm init
   ```

2. 安装 express

   ```js
   npm i express
   ```



### 1.2、 express 脚手架创建一个应用骨架

1. 全局安装 express 脚手架

   ```js
   npm i -g express-generator
   ```

2. 通过脚手架创建项目

   ```js
   express myApp
   ```

3. 安装依赖

   ```js
   cd myApp
   
   npm i
   ```

4. 启动项目

   ```js
   npm run start
   ```



## 2、Express 的简单使用

利用 express 开启服务器：

```js
const express = require('express')

const app = express()

app.get('/info', (req, res, next) => {
  res.end('success')
})

app.post('/login', (req, res, next) => {
  res.end('success')
})

app.listen(9000, () => {
  console.log('服务器开启: 0.0.0.0:9000');
})
```



## 3、中间件

Express是一个基于路由和中间件的 Web 框架，它本身的功能非常少，本质上是一系列中间件函数的调用。



### 3.1、中间件基本认知

**中间件是什么：**

- 中间件的本质是传递给 express 的一个回调函数
- 这个回调函数接受三个参数：
  - request：请求对象
  - response：响应对象
  - next 函数：用于执行下一个中间件的函数



**中间件可以做什么：**

- 执行任意代码

- 更改请求对象（request）和响应对象（response）

- 结束请求-响应周期（返回数据）

  - 一般情况下，结束请求需要手动调用一下 res.end，这个结束操作也可以放到中间件中做

- 调用栈中的下一个中间件

  - 在 express 中，所有的中间件都是存放在 stack 栈中的，执行 next() 就是从这个 stack 栈中拿出下一个中间件执行

    ![](/imgs/img49.png)

注意： 如果当前中间件没有结束请求-响应周期，则必须调用 next() 将控制权传递给下一个中间件功能，否则，请求将被挂起，例如，一个 post 请求：

```js
app.post('/login', (req, res, next) => {
  
})
```

如果没有执行 res.end 结束结束请求-响应周期，并且没有调用 next()，那么请求就会被挂起。



### 3.2、编写中间件



#### 3.2.1、使用中间件的方式

- 应用层中间件：使用 `app.use()` 和 `app.METHOD()` 函数将应用层中间件绑定到 express 的实例上，其中 `METHOD` 是中间件函数处理的请求的小写 HTTP 方法（例如 GET、PUT 或 POST）。

  ```js
  const app = express()
  
  app.use((req, res, next) => {})
  
  app.get('', (req, res, next) => {})
  ```

- 路由层中间件：路由器层中间件的工作方式与应用层中间件基本相同，差异之处在于它绑定到 `express.Router()` 的实例

  ```js
  const router = express.Router()
  
  router.use((req, res, next) => {})
  
  router.get('', (req, res, next) => {})
  ```

  

#### 3.2.2、编写一个最简单的中间件

```js
const express = require('express')

const app = express()

// 编写一个中间件
const myMiddleFun = (req, res, next) => {
  console.log('编写简单中间件')
  res.end('middle ware')
}

// 使用 app.use 注册中间件
app.use(myMiddleFun)

app.listen(9000, () => {
  console.log('服务器启动: 0.0.0.0:9000')
})
```

这就注册了一个中间件，本质是一个回调函数。这个中间件在注册的时候没有加任何条件，那么所有的请求都会执行这个中间件。要想加条件：

- 通过 app.use 第一个参数

  ```js
  app.use('/login', myMiddleFun)
  ```

  只有访问 `/login` 这个路径才响应 myMiddleFun 中间件，这个也叫路径中间件

- 通过 app.METHOD 注册这个中间件

  ```js
  app.get('/info', myMiddleFun)
  ```

  只有是 get 请求，并且访问 `/info` 这个路径才响应 myMiddleFun 中间件，这个也叫方法中间件



#### 3.2.3、多个中间件问题

```js
const express = require('express')

const app = express()

// 中间件1
const myMiddleFun1 = (req, res, next) => {
  console.log('中间件--1')
  res.end('middle ware 1')
}

// 中间件2
const myMiddleFun2 = (req, res, next) => {
  console.log('中间件--2')
  res.end('middle ware 2')
}


// 使用 app.use 注册中间件
app.use(myMiddleFun1)
app.use(myMiddleFun2)

app.listen(9000, () => {
  console.log('服务器启动: 0.0.0.0:9000')
})
```

多个中间件的情况下，会执行哪个呢？答案是默认执行第一个，执行完就结束，不会执行第二个中间件。

要想继续执行第二个中间件，需要在第一个中间件中调用 next()。

**中间件在不使用 next() 的情况下，永远只匹配第一个符合要求的。**

```js
// 中间件1
const myMiddleFun1 = (req, res, next) => {
  console.log('中间件--1')
  next()
}

// 中间件2
const myMiddleFun2 = (req, res, next) => {
  console.log('中间件--2')
  res.end('middle ware')
}
```

这里需要注意的是 res.end 的使用，多个中间件处理同一个问题，res.end 最好放在最后，并且这几个中间件**只能有一个 res.end**。



#### 3.2.4、连续注册中间件

```js
app.use((req, res, next) => {
  console.log('middle--1')
  next()
}, (req, res, next) => {
  console.log('middle--2')
  next()
}, (req, res, next) => {
  console.log('middle--3')
  res.end('连续注册中间件')
})
```

跟上面的一样，也是需要 next() 才会执行下一个中间件，res.end 只能有一个



#### 3.2.5、编写一个中间件解析请求的 body 参数

```js
const parseBody = (req, res, next) => {
  if (req.headers['content-type'] === 'application/json') {
    let data = ''
    req.on('data', chunk => {
      data += chunk
    })

    req.on('end', () => {
      req.body = JSON.parse(data)
      next()
    })
  } else {
    next()
  }
}

app.use(parseBody)

app.post('/login', (req, res) => {
  console.log(req.body)
  res.end('success')
})
```

注意，这里必须在 req.on('end') 后执行 next()，不然后面通过 req.body 会获取不到



### 3.3、内置中间件及第三方中间件

express 本身有内置的中间件，也有很多三方中间件，所以日常开发大多数情况下不需要手动写中间件



#### 3.3.1、内置中间件

使用内置中间件解析 body：

```js
app.use(express.json()) // 解析 json

// extended，为 true 代表使用第三方库 qs 解析，为 false 代表使用 Node 内置的 queryString 解析
app.use(express.urlencoded({ extended: true })) // 解析 x-www-form-urlencoded


app.post('/login', (req, res) => {

 console.log(req.body)

 res.end('success')

})


```

这个功能其实就是第三方中间件 body-parser 的功能，只是 express4.16 将其集成进了 express 中



#### 3.3.2、第三方中间件 multer 处理 form-data

一些常用三方中间件： https://www.expressjs.com.cn/resources/middleware.html



这里以使用 multer 中间件解析 form-data 格式为例：

> 无论是内置的 express 中间件还是 body-parse 中间件，都没办法解析 form-data 数据，解析 form-data 数据需要使用 multer



**安装 multer**

```js
npm i multer
```



**解析 form-data 非文件类型数据**

![](/imgs/img53.png)

```js
const multer = require('multer')

const upload = multer()

// 不要在全局使用，只在当前路由使用，因为全局使用可能会导致用户在其他接口进行上传操作
// app.use(upload.any()) // 用于解析 form-data 非文件类型

app.post('/formdata', upload.any(), (req, res) => {
  console.log(req.body)
  res.end('success')
})
```





**解析 form-data 文件类型数据**

```js
const multer = require('multer')

const upload = multer({
  dest: './imgs/' // 文件上传的之后要存储的路径
})

// upload.single 代表上传的是单张图片，图片是放在 键名为 file 上
// 如果要上传多张，使用 upload.array('files')
app.post('/upload', upload.single('file'), (req, res) => {
  res.end('上传成功')
})
```

- 首先，在 执行 multer 函数的时候传入要保存的位置 dest

- 使用 upload.single 代表单张上传，file 是图片上传时在键名 file 上

  ![](/imgs/img50.png)

- 使用 upload.array() 代表多张上传

但是执行上面的代码，会发现保存的文件没有后缀名

![](/imgs/img51.png)



此时需要进一步处理：

```js
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: './imgs/', // 图片存储的位置
  filename: (req, file, cb) => {
    // callback 的第一位参数代表的错误信息
    // file.originalname 代表上传文件的原始文件名，使用 path.extname 获取后缀
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  // dest: './imgs/' // 文件上传的之后要存储的路径
  storage // 自定义文件信息
})

// upload.single 代表上传的是单张图片，图片是放在 键名为 file 上
// 如果要上传多张，使用 upload.array('files')
app.post('/upload', upload.single('file'), (req, res) => {
  res.end('上传成功')
})
```



如果想要获取处理后的信息，可以使用 **req.file 或者 req.files**，这取决于是上传单张还是多张，或者前面使用了 upload.any() 中间件，也是使用 req.files

```js
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file)
  res.end('上传成功')
})
```

![](/imgs/img52.png)



#### 3.3.3、第三方中间件 morgan 处理请求日志

```js
const fs = require('fs')
const morgan = require('morgan')

const loggerStream = fs.createWriteStream('./logs/logger.log', { flags: 'a+' })

// combined 是写入日志的格式，一般使用这个
// 还需要指定一个写入流
app.use(morgan('combined', { stream: loggerStream }))

app.post('/login', (req, res) => {
  res.end('success')
})
```



## 4、Express 处理客户端传递的参数

基本上，客户端传递参数的方式有：

- 处理 url 中的参数

  - get 的 query 参数：类似 `http://127.0.0.1:9000/info?id=20564`

    在 express 中获取 query 参数很简单，直接通过 req.query 即可，不需要使用任何中间件

    ```js
    app.get('/info', (req, res) => {
      console.log(req.query)
      res.end('success')
    })
    ```

  - get 的 params 参数：类似 `http://127.0.0.1:9000/info/12354`

    在 express 中获取 params 参数也很简单，直接通过 req.params 即可，不需要使用任何中间件

    ```js
    app.get('/info/:id', (req, res) => {
      console.log(req.params)
      res.end('success')
    })
    ```

- 处理 body 中的参数

  - json 格式：使用 express 内置中间件 express.json 或者第三方中间件 body-parse
  - x-www-form-urlencoded格式：使用 express 内置中间件 express.urlencoded 或者第三方中间件 body-parse
  - form-data格式：使用第三方中间件 multer



## 5、Express 响应数据

express 响应数据的方式有很多，具体可以查看：https://www.expressjs.com.cn/4x/api.html#res



下面来看看几个常用的：

- res.end：类似 Node 中的 http 的 res.end，只能返回 string、buffer 类型

  ```js
  app.post('/login', (req, res) => {
    res.end('success')
  })
  ```

- res.json：可以返回 json 格式数据

  ```js
  app.post('/login', (req, res) => {
    res.json({
      code: 0,
      message: 'ok'
    })
  })
  ```

- res.send：可以返回 buffer、字符串、对象、布尔值或数组

  ```js
  app.post('/login', (req, res) => {
    res.send({
      code: 0,
      message: 'ok'
    })
  })
  ```

- res.status：设置响应状态码

  ```js
  app.post('/login', (req, res) => {
    res.status(200)
    res.send({
      code: 0,
      message: 'ok'
    })
  })
  ```

- res.set：设置响应头

  ```js
  app.post('/login', (req, res) => {
    res.set({
      'content-type': 'application/json'
    })
    res.send({
      code: 0,
      message: 'ok'
    })
  })
  ```



## 6、Express 路由

在上面的例子中，其实都是把代码逻辑都写在 app 中，随着项目的复杂度越来越高，app 将变得非常复杂。

此时，就可以使用 express.Router 创建一个个路由来分开处理不同的逻辑，比如登陆、用户信息等

一个 Router 实例拥有完整的中间件和路由系统，因此它也被称为迷你应用程序（mini-app）

```
express-test
├── routers
│   └── users.js
└── index.js
```

> routers/users.js

```js
const express = require('express')

const userRouter = express.Router()

userRouter.get('/info', (req, res) => {
  res.send({
    code: 0,
    data: {
      infoList: [
        {
          id: '001',
          price: 10.00
        },
        {
          id: '002',
          price: 8.99
        }
      ]
    },
    message: 'ok'
  })
})

userRouter.post('info/:id', (req, res) => {
  res.send({
    code: 0,
    message: '修改成功'
  })
})

module.exports = userRouter
```

routers/users.js 中负责写关于 user 模块的逻辑



> index.js

```js
const express = require('express')

const userRouter = require('./routers/users')

const app = express()

app.use('/', userRouter)

app.listen(9000, () => {
  console.log('服务器已开启: 0.0.0.0:9000')
})
```

index 中通过 app.use 使用相关路由即可



## 7、Express 静态资源服务器

Node 其实也可以作为静态资源服务器使用，而 express 提供了非常方便部署静态资源的方法

```js
const express = require('express')

const app = express()

app.use(express.static('./statics'))

app.listen(9000, () => {
  console.log('服务器已开启: 0.0.0.0:9000')
})
```

只需要 app.use(express.static('./statics'))，指定要作为静态资源的目录即可



