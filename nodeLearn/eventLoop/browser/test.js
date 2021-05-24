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