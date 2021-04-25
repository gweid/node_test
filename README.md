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

所以，平时写代码的时候，最好是要固定一些函数的只能，比如说 add 函数，它的职能只是单一的计算两个数之和，而不要进行其他 string 类型的运算，这样能更好的提高 v8 引擎的解析性能



## 3.Node.js 基础

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



