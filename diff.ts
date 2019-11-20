import {Diff, Json, DiffResult} from '.'
let JsonDiff = require('jsondiffpatch');

const diff: Diff = function (a: Json, b: Json): DiffResult {
  /* wait for implementation */
        let json  = JsonDiff.diff(a, b);
        if (json === undefined || json === null) {
            return {
                result: true,
                details: []
            }
        }
        let list = [];
        for (let i in json) {
            if (json.hasOwnProperty(i)) {
                if (typeof json[i] === "object" && i === 'stats') {
                    for (let j in json[i]) {
                        if (json[i].hasOwnProperty(j)) {
                            list.push(`/${i}/${j}`)
                        }
                    }
                    return {
                        result: false,
                        details: list
                    }
                }
                if (typeof json[i] === "object" && i === 'data') {
                    for (let j in json[i]) {
                        if (json[i].hasOwnProperty(j)) {
                            list.push(`/${i}/${j}`)
                        }
                    }
                    return {
                        result: true,
                        details: list
                    }
                }
            }
        }
        return {
            result: false,
            details: list
        }
};

export default diff
