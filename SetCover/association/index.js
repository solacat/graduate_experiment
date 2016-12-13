"use strict";

const fs = require('fs');
const readLine = require('fs-readline');

const rl = readLine('./assoc2.txt');
const _ = require('lodash');
var atr_map = {};


rl.on('line', function (line, idx) {
    var arr = line.split('#');
    var conf = +arr[arr.length - 1];
    var atrs = arr[0].split(' ').sort().join();
    if(atr_map[atrs] == undefined){
        atr_map[atrs] = conf;
    }
    if(idx == 160){
        fs.writeFileSync('./assoc_arr2.json', JSON.stringify(atr_map));
    }
})