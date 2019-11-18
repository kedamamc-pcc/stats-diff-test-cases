/**
 * 测试用例 2
 *
 * 关键数据内容相同，但属性顺序不同
 */

const a = require('./a.json')
const b = require('./b.json')

module.exports = {
  a,
  b,
  expected: true,
}
