let JsonDiff = require('jsondiffpatch');
import {DiffData} from './dean'
export class diff{
    constructor(a: any, b: any, option?: { ignoredKeys?: string[] }) {
        let json = JsonDiff.diff(a, b);
        if (json === undefined || json === null) {
            return {
                expected: true,
                list: []
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
                        expected: false,
                        list: list
                    }
                }
                if (typeof json[i] === "object" && i === 'data') {
                    for (let j in json[i]) {
                        if (json[i].hasOwnProperty(j)) {
                            list.push(`/${i}/${j}`)
                        }
                    }
                    return {
                        expected: true,
                        list: list
                    }
                }
            }
        }
        return {
            expected: false,
            list: list
        }
    }
}

module.exports = (arg:DiffData)=>{
   return  new diff(arg.a, arg.b);
};
