### 1、模块化开发

- 事实上模块化开发最终的目的是将程序划分成一个个小的结构；
- 这个结构中编写属于自己的逻辑代码，有自己的作用域，不会影响到其他的结构；
- 这个结构可以将自己希望暴露的变量、函数、对象等导出给其结构使用；
- 也可以通过某种方式，导入另外结构中的变量、函数、对象等；

**上面说提到的结构，就是模块；**

**按照这种结构划分开发程序的过程，就是模块化开发的过程**



### 2、js 早期设计缺陷

js 是 *Brendan Eich* 仅仅用了 10 天写出的，开发 Js 的初衷仅仅作为一种脚本语言，做一些简单的表单验证或动画实现等。所以必然导致它存在很多缺陷：

- 比如 var 定义的变量作用域问题
- 比如 js 的面向对象并不能像常规面向对象语言一样使用 class
- 比如 js 没有模块化的问题



### 3、js 没有模块化存在的问题

例如，在 模块 a.js 中：

```js
var flag = true
if (flag) {
    console.log('a.js')
}
```

在模块 b.js 中：

```js
var flag = false
if (flag) {
    console.log('b.js')
}
```

在模块 c.js 中：

```js
if (flag) {
    console.log('c.js')
}
```

使用：

```js
<script src="./aaa.js"></script>
<script src="./bbb.js"></script>
<script src="./ccc.js"></script>
```

这很明显就存在了命名冲突的问题，多个 模块同时改动同一个变量，那么对于项目开发来说将是灾难性的



而没有模块化的 js 的解决方案是 IIFE，立即执行函数：

```js
var moduleA = (function() {
    var flag = true
    if (flag) {
        console.log('a.js')
    }
})()
```

立即执行函数解决了 命名污染的问题，但是也会带来新的问题：

- 第一，我必须记得每一个模块中返回对象的命名，才能在其他模块使用过程中正确的使用；
- 第二，代码写起来混乱不堪，每个文件中的代码都需要包裹在一个匿名函数中来编写；
- 第三，在没有合适的规范情况下，每个人、每个公司都可能会任意命名、甚至出现模块名称相同的情况；



### 4、CommonJS 规范

CommonJS  是一种规范，最初提出来是在浏览器以外的地方使用

而 Node 是 CommonJS 在服务器端一个具有代表性的实现，在 node 中可以方便的使用模块化进行开发：

- node 中每一个 js 文件都是一个单独的模块
  - exports 和 module.exports 可以对模块进行导出
  - require 可以对模块进行导入

#### 4-1、exports

exports 是一个对象，可以在这个对象上添加许多属性，添加的属性会被导出

例如：b.js 中

```js
const name = 'jack'
const age = 18

exports.name = name
exports.age = age
```

在 index.js 中

```js
const b = require('./b.js')

console.log(b.name)
console.log(b.age)
```

上面的 `const b = require('./b.js')` 代表着 b 就是 b.js 中的 exports 对象，而 b 是 b.js 的 exports 的浅拷贝

验证：b.js 

```js
const name = 'jack'
const age = 18

exports.name = name
exports.age = age

setTimeout(() => {
  exports.name = 'mark'
}, 1000)
```

index.js

```js
const b = require('./b')

console.log(b.name)
console.log(b.age)

setTimeout(() => {
  console.log(b.name)
}, 2000)
```

2 秒后 index.js 中 b.name 的值为 mark



#### 4-2、module.exports