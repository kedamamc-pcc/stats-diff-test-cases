/**
 * 测试用例 1
 *
 * 关键数据相同，非关键数据不同
 */

const a = require('./a.json')
const b = require('./b.json')

module.exports = {
  a,
  b,
  ignoredKeys: ['/data/lastUpdate'],
  expected: true,
}
