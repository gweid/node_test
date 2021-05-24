//---------------------Node 不同版本 Event Loop 的执行顺序差异


// timers 阶段的差异
// setTimeout(()=>{
//   console.log('setTimeout--1')
//   Promise.resolve().then(function() {
//     console.log('promise.then--1')
//   })
// }, 100)

// setTimeout(()=>{
//   console.log('setTimeout--2')
//   Promise.resolve().then(function() {
//     console.log('promise.then--2')
//   })
// })


// check 阶段的差异
// setImmediate(() => console.log('immediate--1'));
// setImmediate(() => {
//   console.log('immediate--2');
//   Promise.resolve().then(() => console.log('promise.then'));
// });
// setImmediate(() => console.log('immediate--3'));


// process.nextTick 的执行变化差异
setImmediate(() => console.log('setImmediate--1'));
setImmediate(() => {
  console.log('setImmediate--2');
  process.nextTick(() => console.log('nextTick'));
});
setImmediate(() => console.log('setImmediate--3'));
