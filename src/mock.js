// 引入mockjs
const Mock = require('mockjs')
// 使用mockjs模拟数据
Mock.mock('/api/login', (req, res) => {
  return {
    data: {
      'hasUser': true,
      'passWordMatched': 'true'
    }
  }
})
