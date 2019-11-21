import {Diff, DiffResult, Json} from '.'

const JsonDiff = require('jsondiffpatch')

const diff: Diff = function (a: Json, b: Json): DiffResult {
  let delta = JsonDiff.diff(a, b)
  if (delta == null) {
    return {
      result: true,
      details: [],
    }
  }
  let list = []
  for (let [key, val] of Object.entries(delta)) {
    if (typeof val === 'object' && key === 'stats') {
      for (let j of Object.keys(val)) {
        list.push(`/${key}/${j}`)
      }
      return {
        result: false,
        details: list,
      }
    }
    if (typeof val === 'object' && key === 'data') {
      for (let j of Object.keys(val)) {
        list.push(`/${key}/${j}`)
      }
      return {
        result: true,
        details: list,
      }
    }
  }
  return {
    result: false,
    details: list,
  }
}

export default diff
