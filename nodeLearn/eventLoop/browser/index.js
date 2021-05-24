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