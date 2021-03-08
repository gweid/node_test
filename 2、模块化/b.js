const name = 'jack'
const age = 18

exports.name = name
exports.age = age

setTimeout(() => {
  exports.name = 'mark'
}, 1000)