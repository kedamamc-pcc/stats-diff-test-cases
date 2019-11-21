const fs = require('fs')

import diff from './diff'

const testcases = fs.readdirSync('./tests').map(f => require('./tests/' + f))

console.log(`${'Case #'.padEnd(8, ' ')} Expected Result`)
console.log('-------- -------- ------')
testcases.forEach((testcase, idx) => {
  const {a, b, expected} = testcase
  const {result} = diff(a, b, { ignoredKeys: testcase.ignoredKeys })

  const caseNo = (idx + 1 + '').padStart(2, '0')
  console.log(`${caseNo.padEnd(8, ' ')} ${(expected + '').padEnd(8, ' ')} ${result}`)
})

export interface Diff {
  (a: StatsData['a'], b: StatsData['b'], options?: DiffOptions): DiffResult
}

export interface StatsData {
  a: Json
  b: Json
  ignoredKeys?: string[]
  expected: boolean
}

export interface DiffOptions {
  ignoredKeys?: string[]
}

export interface DiffResult {
  result: boolean
  /**
   * Planned, currently not required
   */
  details?: DiffDetail[]
}

/**
 * Elements of the array:
 *
 * [ Key path,
 *   Value from data A,
 *   Value from data B ]
 *
 * If the key being diffed isn't exist on one side, mark it with undefined
 */
export type DiffDetail = [string, JsonPrimitive, JsonPrimitive] | [string, undefined, JsonPrimitive] | [string, JsonPrimitive, undefined]

export type JsonPrimitive = null | string | number | boolean

export interface Json {
  [key: string]: JsonPrimitive | Json | JsonArray
}

export interface JsonArray extends Array<JsonPrimitive | Json | JsonArray> {}
