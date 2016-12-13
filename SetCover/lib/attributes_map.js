"use strict";

const fs = require('fs');

const string = "abcdefghijklnmopqrstuvwxyz";
const str_Arr = string.split('');

var str_map = {};
str_Arr.map((item, index)=>{
    str_map[index+1] = item;
})
fs.writeFileSync('./attributes_map.json', JSON.stringify(str_map));
