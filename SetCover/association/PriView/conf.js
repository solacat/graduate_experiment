"use strict";

const fs = require('fs');
const readLine = require('fs-readline');

const rl = readLine('./data/17-6.txt');
const _ = require('lodash');
const attr_map = require('../../lib/attributes_map.json');
var atr_map = [];

rl.on('line', function (line, idx) {
    var attrs = line.split(' ');
    attrs.map((item,index)=>{
        attrs[index] = attr_map[item];
    })
    atr_map.push(attrs.join().replace(/,/g,''));
    if(idx == 1213){
        fs.writeFileSync('./data/17-6.json', JSON.stringify(atr_map));
    }
})