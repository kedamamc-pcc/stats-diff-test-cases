import {Diff, DiffOptions, DiffResult, Json} from '.'

const JsonDiff = require('jsondiffpatch');

const diff: Diff = function (a: Json, b: Json, option?: DiffOptions): DiffResult {
  let delta = JsonDiff.diff(a, b);
  if (delta == null) {
    return {
      result: true,
      details: [],
    }
  }
  let list = [];
  for (let [key, val] of Object.entries(delta)) {
    for (let j of Object.keys(val)) {
      if (option.ignoredKeys) {
        if (option.ignoredKeys.indexOf(`/${key}/${j}`) >= 0) {
          return {
            result: true,
            details: list,
          }
        }
        list.push(`/${key}/${j}`);
        return {
          result: false,
          details: list,
        }
      }
    }
  }
  return {
    result: false,
    details: list,
  }
};

export default diff
