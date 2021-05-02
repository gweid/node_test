// 事件总线 event

// const EventEmitter = require('events')

// const eventBus = new EventEmitter()

// const clickEvent = (args) => {
//   console.log(args)
// }
// // 事件监听
// eventBus.on('click', clickEvent)

// // 事件播报
// setTimeout(() => {
//   eventBus.emit('click', { msg: 'hello' })

//   // 取消事件监听
//   eventBus.off('click', clickEvent)
// }, 1000)

// // 上面已经取消，这里播报的不会再被监听到
// setTimeout(() => {
//   eventBus.emit('click', { msg: 'hihihi' })
// }, 2000)

// console.log(eventBus.eventNames())

// 只监听一次
// const EventEmitter = require('events')
// const eventBus = new EventEmitter()

// const clickEvent = (args) => {
//   console.log(args)
// }
// // 只监听一次
// eventBus.once('click', clickEvent)

// setTimeout(() => {
//   eventBus.emit('click', { msg: 'hello' })
// }, 1000)
// setTimeout(() => {
//   eventBus.emit('click', { msg: 'hihihi' })
// }, 2000)

// 移除所有监听
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