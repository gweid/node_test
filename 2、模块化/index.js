const b = require('./b')

console.log(b.name)
console.log(b.age)

setTimeout(() => {
  console.log(b.name)
}, 2000)