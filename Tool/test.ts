import {DiffData} from "./dean";

let diff = require('./diff.js');

let data: DiffData = require('../tests/01');
let res = new diff(data.a, data.b);
console.log(res);

