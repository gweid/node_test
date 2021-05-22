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